var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let MyLovelaceCard = class MyLovelaceCard extends LitElement {
    render() {
        return html `
      <div class="card">
        ${this.config.title
            ? html `<div class="card-header">${this.config.title}</div>`
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
};
MyLovelaceCard.styles = css `
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
__decorate([
    property({ attribute: false })
], MyLovelaceCard.prototype, "config", void 0);
MyLovelaceCard = __decorate([
    customElement('my-lovelace-card')
], MyLovelaceCard);
export { MyLovelaceCard };
//# sourceMappingURL=lovelace-card.js.map