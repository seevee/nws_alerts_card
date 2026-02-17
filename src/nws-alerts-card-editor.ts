import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, NwsAlertsCardConfig } from './types';

@customElement('nws-alerts-card-editor')
export class NwsAlertsCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: NwsAlertsCardConfig;
  public setConfig(config: NwsAlertsCardConfig): void {
    this._config = config;
  }

  private _fireConfigChanged(newConfig: NwsAlertsCardConfig): void {
    this._config = newConfig;
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _entityChanged(ev: CustomEvent): void {
    const entity = ev.detail.value as string;
    if (entity === this._config.entity) return;
    this._fireConfigChanged({ ...this._config, entity });
  }

  private _titleChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const title = target.value;
    if (title === (this._config.title || '')) return;
    const newConfig = { ...this._config };
    if (title) {
      newConfig.title = title;
    } else {
      delete newConfig.title;
    }
    this._fireConfigChanged(newConfig);
  }

  private _animationsChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const animations = target.checked;
    if (animations === (this._config.animations !== false)) return;
    const newConfig = { ...this._config };
    if (animations) {
      delete newConfig.animations;
    } else {
      newConfig.animations = false;
    }
    this._fireConfigChanged(newConfig);
  }

  private _zonesChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const raw = target.value;
    const newConfig = { ...this._config };
    if (raw.trim()) {
      newConfig.zones = raw.split(',').map(z => z.trim()).filter(Boolean);
    } else {
      delete newConfig.zones;
    }
    this._fireConfigChanged(newConfig);
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;

    const zonesStr = this._config.zones ? this._config.zones.join(', ') : '';

    return html`
      <div class="editor">
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { domain: 'sensor' } }}
          .value=${this._config.entity}
          .label=${'Entity (required)'}
          .required=${true}
          @value-changed=${this._entityChanged}
        ></ha-selector>

        <ha-textfield
          .label=${'Title (optional)'}
          .value=${this._config.title || ''}
          @change=${this._titleChanged}
        ></ha-textfield>

        <ha-textfield
          .label=${'Zones (optional)'}
          .value=${zonesStr}
          .helper=${'Comma-separated zone codes, e.g. COC059, COZ039'}
          .helperPersistent=${true}
          @change=${this._zonesChanged}
        ></ha-textfield>

        <ha-formfield .label=${'Enable animations'}>
          <ha-switch
            .checked=${this._config.animations !== false}
            @change=${this._animationsChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'nws-alerts-card-editor': NwsAlertsCardEditor;
  }
}
