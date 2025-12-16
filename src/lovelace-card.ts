import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-lovelace-card')
export class MyLovelaceCard extends LitElement {
  @property({ attribute: false })
  public config!: {
    type: string;
    title?: string;
    [key: string]: any;
  };

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      color: var(--primary-text-color);
    }

    .card {
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      background-color: var(--primary-color);
      color: var(--text-primary-color);
      padding: 12px 16px;
      font-weight: 500;
      font-size: 1.1em;
    }

    .card-content {
      padding: 16px;
    }

    .card-footer {
      background-color: var(--background-color);
      padding: 12px 16px;
      font-size: 0.8em;
      color: var(--secondary-text-color);
      border-top: 1px solid var(--divider-color);
    }
  `;

  render() {
    return html`
      <div class="card">
        ${this.config.title
          ? html`<div class="card-header">${this.config.title}</div>`
          : null}
        <div class="card-content">
          <slot></slot>
        </div>
        <div class="card-footer">
          Custom Lovelace Card Template
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-lovelace-card': MyLovelaceCard;
  }
}
