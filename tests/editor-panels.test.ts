import { describe, it, expect } from 'vitest';
import { render } from 'lit';
import { WeatherAlertsCardEditor } from '../src/weather-alerts-card-editor';
import {
  DETAIL_SECTIONS, PANELS, PANEL_LABELS, SELECT_FIELDS, TOGGLE_FIELDS, changedCount,
  type Panel,
} from '../src/editor-fields';
import { translations } from '../src/translations';
import type { HomeAssistant, WeatherAlertsCardConfig } from '../src/types';

// The regrouped editor: seven ha-expansion-panels, each declaring its header
// and a "n changed" secondary from the registry; dependents hidden (never
// disabled) behind their master; the detail sections as one list selector.
// ha-expansion-panel is undefined in jsdom, so panel children stay ordinary
// light DOM and querySelector reaches them.
type EditorInternals = {
  _config: WeatherAlertsCardConfig;
  hass: HomeAssistant;
  render(): unknown;
  addEventListener(type: string, listener: (ev: Event) => void): void;
};

type PanelEl = Element & { header?: string; secondary?: string; expanded?: boolean };
type Labelled = Element & { label?: string; value?: unknown; disabled?: unknown; selector?: { select?: { options?: { value: string; label: string }[] } } };

const en = translations.en;
const ORDER: Panel[] = ['source', 'filtering', 'appearance', 'details', 'behavior', 'dismissal', 'advanced'];

function base(extra: Partial<WeatherAlertsCardConfig> = {}): WeatherAlertsCardConfig {
  return { type: 'custom:weather-alerts-card', entity: 'sensor.nws_alerts', ...extra } as WeatherAlertsCardConfig;
}

function makeEditor(config: WeatherAlertsCardConfig): { editor: EditorInternals; events: WeatherAlertsCardConfig[] } {
  const editor = new WeatherAlertsCardEditor() as unknown as EditorInternals;
  editor._config = config;
  editor.hass = {
    states: { 'sensor.nws_alerts': { state: '0', attributes: { Alerts: [] } } },
    locale: { language: 'en' },
  } as unknown as HomeAssistant;
  const events: WeatherAlertsCardConfig[] = [];
  editor.addEventListener('config-changed', (ev) => events.push((ev as CustomEvent).detail.config));
  return { editor, events };
}

function renderHost(editor: EditorInternals): HTMLElement {
  const host = document.createElement('div');
  render(editor.render() as never, host, { host: editor });
  return host;
}

/** Top-level panels, keyed by their registry panel id. */
function panels(host: HTMLElement): Record<Panel, PanelEl> {
  const top = [...host.querySelectorAll('.editor > ha-expansion-panel')] as PanelEl[];
  const byHeader = new Map(top.map(p => [p.header, p]));
  return Object.fromEntries(ORDER.map(id => [id, byHeader.get(en[PANEL_LABELS[id]])])) as Record<Panel, PanelEl>;
}

const formfieldLabels = (root: Element) => [...root.querySelectorAll('ha-formfield')].map(f => (f as Labelled).label);
const selectLabels = (root: Element) => [...root.querySelectorAll('ha-select')].map(s => (s as Labelled).label);
const sectionsList = (root: Element) =>
  ([...root.querySelectorAll('ha-selector')] as Labelled[]).find(s => s.label === 'Sections');

describe('panel layout', () => {
  it('renders the seven panels in order, Source open and the rest collapsed', () => {
    const host = renderHost(makeEditor(base()).editor);
    const top = [...host.querySelectorAll('.editor > ha-expansion-panel')] as PanelEl[];
    expect(top.map(p => p.header)).toEqual(ORDER.map(id => en[PANEL_LABELS[id]]));
    expect(top.map(p => p.expanded)).toEqual([true, false, false, false, false, false, false]);
    expect(top.every(p => p.hasAttribute('outlined'))).toBe(true);
  });

  it('keeps the preview tools above the panels', () => {
    const host = renderHost(makeEditor(base()).editor);
    const editor = host.querySelector('.editor')!;
    expect(editor.firstElementChild?.className).toBe('preview-tools');
    expect(host.querySelector('ha-expansion-panel .preview-tools')).toBeNull();
  });

  it('places every registry field in the panel the registry names', () => {
    const host = renderHost(makeEditor(base({ showGeometry: true, allowDismiss: true })).editor);
    const byPanel = panels(host);
    for (const f of TOGGLE_FIELDS) {
      const label = en[f.label];
      const panel = byPanel[f.panel];
      if ((DETAIL_SECTIONS as readonly string[]).includes(f.key)) {
        expect(sectionsList(panel)?.selector?.select?.options?.map(o => o.label), f.key).toContain(label);
      } else {
        expect(formfieldLabels(panel), f.key).toContain(label);
      }
    }
    for (const f of SELECT_FIELDS) {
      expect(selectLabels(byPanel[f.panel]), f.key).toContain(en[f.label]);
    }
  });

  it('moves the provider override, timezone, contrast, text and dedup keys to Advanced', () => {
    const byPanel = panels(renderHost(makeEditor(base()).editor));
    expect(selectLabels(byPanel.advanced)).toEqual(['Alert provider', 'Timezone', 'Enhance contrast']);
    expect(formfieldLabels(byPanel.advanced)).toEqual([
      'Reflow alert text (strip hard line breaks)', 'Deduplicate alerts', 'Deduplicate headlines',
    ]);
    expect(formfieldLabels(byPanel.source)).toEqual([]);
    expect(formfieldLabels(byPanel.appearance)).toContain('Show provider label');
  });

  it('nests the styling group inside Appearance as a non-outlined panel', () => {
    const byPanel = panels(renderHost(makeEditor(base({ progressFill: 'background', progressStyle: { active: 'striped' } })).editor));
    const nested = byPanel.appearance.querySelector('ha-expansion-panel') as PanelEl;
    expect(nested.header).toBe('Progress & icon styling');
    expect(nested.hasAttribute('outlined')).toBe(false);
    expect(nested.expanded).toBe(false);
    expect(nested.secondary).toBe('2 changed');
    expect(selectLabels(nested)).toContain('Progress fill');
  });
});

describe('panel header counts', () => {
  it('shows no count anywhere on a default card', () => {
    const byPanel = panels(renderHost(makeEditor(base()).editor));
    for (const id of ORDER) expect(byPanel[id].secondary, id).toBe('');
  });

  it('never counts Source, even with every source key set', () => {
    const byPanel = panels(renderHost(makeEditor(base({ entities: ['a'], device: 'd', sources: ['s'], title: 'T' })).editor));
    expect(byPanel.source.secondary).toBe('');
  });

  it('counts registry keys off their default plus present bespoke keys', () => {
    const cfg = base({
      zones: ['A'], minSeverity: 'severe',                       // filtering: 2
      layout: 'compact', showProvider: true, progressStyle: { active: 'striped' }, // appearance: 3
      showDetails: false, showGeometry: true,                    // details: 2 (hidden key still counts)
      tap_action: { action: 'none' }, hideNoAlerts: true,        // behavior: 2
      allowDismiss: true,                                        // dismissal: 1
      provider: 'bom', deduplicate: false, timezone: 'browser', reformatText: false, // advanced: 4
    });
    const byPanel = panels(renderHost(makeEditor(cfg).editor));
    expect(byPanel.filtering.secondary).toBe('2 changed');
    expect(byPanel.appearance.secondary).toBe('3 changed');
    expect(byPanel.details.secondary).toBe('2 changed');
    expect(byPanel.behavior.secondary).toBe('2 changed');
    expect(byPanel.dismissal.secondary).toBe('1 changed');
    expect(byPanel.advanced.secondary).toBe('4 changed');
    for (const id of ORDER) {
      if (id !== 'source') expect(changedCount(cfg, PANELS[id]), id).toBe(Number(byPanel[id].secondary!.split(' ')[0]));
    }
  });

  it('does not count a key stored explicitly at its default', () => {
    const byPanel = panels(renderHost(makeEditor(base({ showDetails: true, animations: true, sortOrder: 'default' })).editor));
    expect(byPanel.details.secondary).toBe('');
    expect(byPanel.appearance.secondary).toBe('');
    expect(byPanel.behavior.secondary).toBe('');
  });
});

describe('hide, not disable', () => {
  const disabledAnywhere = (host: HTMLElement) =>
    [...host.querySelectorAll('ha-switch, ha-select, ha-selector')].filter(el => (el as Labelled).disabled !== undefined);

  it('binds no disabled property on any control, whatever the masters say', () => {
    for (const cfg of [base(), base({ showDetails: false }), base({ allowDismiss: true }), base({ showDetails: false, allowDismiss: false })]) {
      expect(disabledAnywhere(renderHost(makeEditor(cfg).editor))).toEqual([]);
    }
  });

  it('removes the detail dependents while the detail panel is off, and restores them', () => {
    const off = panels(renderHost(makeEditor(base({ showDetails: false, showGeometry: true })).editor)).details;
    expect(formfieldLabels(off)).toEqual(['Show detail panel']);
    expect(sectionsList(off)).toBeUndefined();
    expect(selectLabels(off)).toEqual([]);

    const on = panels(renderHost(makeEditor(base({ showGeometry: true })).editor)).details;
    expect(formfieldLabels(on)).toEqual(['Show detail panel', 'Always expand details', 'Show my location on the map']);
    expect(sectionsList(on)).toBeDefined();
    expect(selectLabels(on)).toEqual(['Area map style']);
  });

  it('removes the dismissal dependents until dismissing is allowed', () => {
    const off = panels(renderHost(makeEditor(base({ showDismissUndo: false })).editor)).dismissal;
    expect(formfieldLabels(off)).toEqual(['Allow dismissing alerts']);
    expect(selectLabels(off)).toEqual([]);

    const on = panels(renderHost(makeEditor(base({ allowDismiss: true })).editor)).dismissal;
    expect(formfieldLabels(on)).toEqual(['Allow dismissing alerts', 'Show undo notification on dismiss']);
    expect(selectLabels(on)).toEqual(['Dismiss trigger', 'Button style']);

    const swipe = panels(renderHost(makeEditor(base({ allowDismiss: true, dismissTrigger: 'swipe' })).editor)).dismissal;
    expect(selectLabels(swipe)).toEqual(['Dismiss trigger']);
  });
});

describe('detail sections list', () => {
  const ALL_ON = ['showMetadata', 'showDescription', 'showInstructions', 'showSourceLink'];
  const change = (list: Element, value: unknown) =>
    list.dispatchEvent(new CustomEvent('value-changed', { detail: { value } }));

  it('offers the five sections in order and reflects the effective on-set', () => {
    const list = sectionsList(renderHost(makeEditor(base()).editor))!;
    expect(list.selector?.select).toMatchObject({ multiple: true, mode: 'list' });
    expect(list.selector?.select?.options?.map(o => o.value)).toEqual([...DETAIL_SECTIONS]);
    expect(list.value).toEqual(ALL_ON);

    const some = sectionsList(renderHost(makeEditor(base({ showDescription: false, showGeometry: true })).editor))!;
    expect(some.value).toEqual(['showMetadata', 'showInstructions', 'showSourceLink', 'showGeometry']);
  });

  it('unchecking a default-on section writes false for exactly that key, in one event', () => {
    const { editor, events } = makeEditor(base());
    change(sectionsList(renderHost(editor))!, ALL_ON.filter(k => k !== 'showMetadata'));
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual(base({ showMetadata: false }));
  });

  it('checking the default-off map section writes true; unchecking it deletes the key', () => {
    const { editor, events } = makeEditor(base());
    change(sectionsList(renderHost(editor))!, [...ALL_ON, 'showGeometry']);
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual(base({ showGeometry: true }));

    change(sectionsList(renderHost(editor))!, ALL_ON);
    expect(events).toHaveLength(2);
    expect(events[1]).toEqual(base());
  });

  it('re-checking a section stored as false deletes the key rather than writing true', () => {
    const { editor, events } = makeEditor(base({ showSourceLink: false }));
    change(sectionsList(renderHost(editor))!, ALL_ON);
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual(base());
  });

  it('fires nothing when the set is unchanged, and treats a non-array as empty', () => {
    const { editor, events } = makeEditor(base({ showGeometry: true }));
    change(sectionsList(renderHost(editor))!, [...ALL_ON, 'showGeometry']);
    expect(events).toHaveLength(0);

    change(sectionsList(renderHost(editor))!, undefined);
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual(base({ showMetadata: false, showDescription: false, showInstructions: false, showSourceLink: false }));
  });
});
