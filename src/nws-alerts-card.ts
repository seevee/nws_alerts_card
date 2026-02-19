import { LitElement, html, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, NwsAlertsCardConfig, NwsAlert, AlertProgress } from './types';
import {
  getWeatherIcon,
  getCertaintyIcon,
  computeAlertProgress,
  formatProgressTimestamp,
  formatLocalTimestamp,
  normalizeSeverity,
  sortAlerts,
  alertMatchesZones,
} from './utils';
import { cardStyles } from './styles';
import './nws-alerts-card-editor';

@customElement('nws-alerts-card')
export class NwsAlertsCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: NwsAlertsCardConfig;
  @state() private _expandedAlerts: Map<string, boolean> = new Map();

  public setConfig(config: NwsAlertsCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this._config = config;
  }

  public getCardSize(): number {
    const alerts = this._getAlerts();
    const perAlert = this._isCompact ? 1 : 3;
    return Math.max(1, alerts.length * perAlert);
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('nws-alerts-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return { entity: 'sensor.nws_alerts_alerts' };
  }

  private _getAlerts(): NwsAlert[] {
    if (!this.hass || !this._config) return [];
    const entity = this.hass.states[this._config.entity];
    if (!entity) return [];
    const alerts = (entity.attributes['Alerts'] as NwsAlert[] | undefined) || [];

    let filtered = alerts;
    if (this._config.zones && this._config.zones.length > 0) {
      const zoneSet = new Set(this._config.zones.map(z => z.toUpperCase()));
      filtered = alerts.filter(a => alertMatchesZones(a, zoneSet));
    }

    return sortAlerts(filtered, this._config.sortOrder || 'default');
  }

  private get _animationsEnabled(): boolean { return this._config?.animations !== false; }
  private get _isCompact(): boolean { return this._config?.layout === 'compact'; }
  private _normalizeText(text: string | undefined): string {
    return (text || '').replace(/\n{2,}/g, '\n\n').trim();
  }

  private _toggleDetails(alertId: string): void {
    const next = new Map(this._expandedAlerts);
    next.set(alertId, !next.get(alertId));
    this._expandedAlerts = next;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;

    const entity = this.hass.states[this._config.entity];
    if (!entity) {
      return html`
        <ha-card .header=${this._config.title || ''}>
          <div class="error">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    const stateVal = entity.state;
    if (stateVal === 'unavailable' || stateVal === 'unknown') {
      return html`
        <ha-card .header=${this._config.title || ''}>
          <div class="sensor-unavailable">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            NWS Alerts sensor is ${stateVal}.
          </div>
        </ha-card>
      `;
    }

    const alerts = this._getAlerts();
    const animClass = this._animationsEnabled ? '' : 'no-animations';
    const layoutClass = this._isCompact ? 'compact' : '';

    return html`
      <ha-card .header=${this._config.title || ''} class="${animClass} ${layoutClass}">
        ${alerts.length === 0
        ? this._renderNoAlerts()
        : alerts.map(alert => this._renderAlert(alert))}
      </ha-card>
    `;
  }

  private _renderNoAlerts(): TemplateResult {
    return html`
      <div class="no-alerts">
        <ha-icon icon="mdi:weather-sunny"></ha-icon><br>
        No active NWS alerts.
      </div>
    `;
  }

  private _renderAlert(alert: NwsAlert): TemplateResult {
    const severity = normalizeSeverity(alert.Severity);
    const className = `severity-${severity}`;
    const progress = computeAlertProgress(alert);
    const phaseClass = progress.phaseText.toLowerCase();
    const expanded = this._expandedAlerts.get(alert.ID) || false;

    if (this._isCompact) {
      return this._renderCompactAlert(alert, className, phaseClass, progress, expanded);
    }

    return this._renderFullAlert(alert, className, phaseClass, progress, expanded);
  }

  private _renderCompactAlert(
    alert: NwsAlert, className: string, phaseClass: string,
    progress: AlertProgress, expanded: boolean,
  ): TemplateResult {
    return html`
      <div class="alert-card ${className} ${phaseClass}">
        <div
          class="alert-header-row compact-row"
          @click=${() => this._toggleDetails(alert.ID)}
        >
          <div class="icon-box">
            <ha-icon icon=${getWeatherIcon(alert.Event)}></ha-icon>
          </div>
          <span class="alert-title">${alert.Event || 'Unknown'}</span>
          <ha-icon
            icon="mdi:chevron-down"
            class="compact-chevron ${expanded ? 'expanded' : ''}"
          ></ha-icon>
        </div>
        ${expanded ? this._renderExpandedContent(alert, progress) : nothing}
      </div>
    `;
  }

  private _renderExpandedContent(alert: NwsAlert, progress: AlertProgress): TemplateResult {
    const desc = this._normalizeText(alert.Description);
    const instr = this._normalizeText(alert.Instruction);

    return html`
      <div class="alert-expanded">
        <div class="badges-row" style="padding: 0 12px 8px;">
          ${this._renderBadgesRow(alert, progress)}
        </div>

        ${this._renderProgressSection(alert, progress)}

        <div class="alert-details-section">
          <div
            class="details-summary"
            @click=${() => this._toggleDetails(alert.ID + '_details')}
          >
            <span>Read Details</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${this._expandedAlerts.get(alert.ID + '_details') ? 'expanded' : ''}"
            ></ha-icon>
          </div>
          ${this._expandedAlerts.get(alert.ID + '_details')
        ? this._renderDetailsContent(alert, progress)
        : nothing}
        </div>
      </div>
    `;
  }

  private _renderFullAlert(
    alert: NwsAlert, className: string, phaseClass: string,
    progress: AlertProgress, expanded: boolean,
  ): TemplateResult {
    return html`
      <div class="alert-card ${className} ${phaseClass}">
        <div class="alert-header-row">
          <div class="icon-box">
            <ha-icon icon=${getWeatherIcon(alert.Event)}></ha-icon>
          </div>
          <div class="info-box">
            <div class="title-row">
              <span class="alert-title">${alert.Event || 'Unknown'}</span>
            </div>
            <div class="badges-row">
              ${this._renderBadgesRow(alert, progress)}
            </div>
          </div>
        </div>

        ${this._renderProgressSection(alert, progress)}

        <div class="alert-details-section">
          <div
            class="details-summary"
            @click=${() => this._toggleDetails(alert.ID)}
          >
            <span>Read Details</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${expanded ? 'expanded' : ''}"
            ></ha-icon>
          </div>
          ${expanded ? this._renderDetailsContent(alert, progress) : nothing}
        </div>
      </div>
    `;
  }

  private _renderBadgesRow(alert: NwsAlert, progress: AlertProgress): TemplateResult {
    return html`
      <span class="badge severity-badge">${alert.Severity}</span>
      <span class="badge certainty-badge">
        <ha-icon
          icon=${getCertaintyIcon(alert.Certainty)}
          style="--mdc-icon-size: 14px; width: 14px; height: 14px;"
        ></ha-icon>
        ${alert.Certainty}
      </span>
      ${progress.isActive
        ? html`<span class="badge active-badge">Active</span>`
        : html`<span class="badge prep-badge">In Prep</span>`}
    `;
  }

  private _renderTextBlock(label: string, text: string): TemplateResult | typeof nothing {
    if (!text) return nothing;
    return html`
      <div class="text-block">
        <div class="text-label">${label}</div>
        <div class="text-body">${text}</div>
      </div>
    `;
  }

  private _renderDetailsContent(alert: NwsAlert, progress: AlertProgress): TemplateResult {
    const desc = this._normalizeText(alert.Description);
    const instr = this._normalizeText(alert.Instruction);

    return html`
      <div class="details-content">
        <div class="meta-grid">
          <div class="meta-item">
            <span class="meta-label">Issued</span>
            <span class="meta-value">${formatLocalTimestamp(progress.sentTs, this.hass.locale)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Onset</span>
            <span class="meta-value">${formatLocalTimestamp(progress.onsetTs, this.hass.locale)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Expires</span>
            <span class="meta-value">${formatLocalTimestamp(progress.endsTs, this.hass.locale)}</span>
          </div>
        </div>

        ${this._renderTextBlock('Description', desc)}
        ${this._renderTextBlock('Instructions', instr)}

        <div class="footer-link">
          <a href=${alert.URL || '#'} target="_blank">
            Open NWS Source
            <ha-icon icon="mdi:open-in-new" style="width:14px;"></ha-icon>
          </a>
        </div>
      </div>
    `;
  }

  private _renderProgressSection(alert: NwsAlert, progress: AlertProgress): TemplateResult {
    const { isActive, progressPct, hasEndTime, onsetMinutes, onsetHours, onsetTs, endsTs, nowTs } = progress;

    const noAnim = !this._animationsEnabled;
    const fillStyle = isActive && !hasEndTime
      ? noAnim
        ? 'width: 100%; left: 0; opacity: 0.8;'
        : 'width: 100%; left: 0; animation: ongoing-pulse 5s infinite; opacity: 0.8;'
      : `width: ${100 - progressPct}%; left: ${progressPct}%;`;

    return html`
      <div class="progress-section">
        <div class="progress-labels">
          <div class="label-left">
            <span class="label-sub">${isActive ? 'Start' : 'Now'}</span><br>
            ${formatProgressTimestamp(isActive ? onsetTs : nowTs, this.hass.locale)}
          </div>
          <div class="label-center">
            ${!hasEndTime
        ? html`<span style="color: var(--color);"><b>Ongoing</b></span>`
        : isActive
          ? html`${Math.round(progressPct)}% Elapsed`
          : html`starts in <b>${onsetMinutes < 60 ? onsetMinutes : onsetHours}</b> ${onsetMinutes < 60 ? 'min' : 'hrs'}`}
          </div>
          <div class="label-right">
            <span class="label-sub">End</span><br>
            ${hasEndTime ? formatProgressTimestamp(endsTs, this.hass.locale) : 'TBD'}
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style=${fillStyle}></div>
        </div>
      </div>
    `;
  }
}

// Register with HA card picker
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = window as any;
w.customCards = w.customCards || [];
w.customCards.push({
  type: 'nws-alerts-card',
  name: 'NWS Alerts Card',
  description: 'A card for displaying NWS weather alerts with severity indicators, progress bars, and expandable details.',
});

declare global {
  interface HTMLElementTagNameMap {
    'nws-alerts-card': NwsAlertsCard;
  }
}
