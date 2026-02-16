import { LitElement } from 'lit';
export declare class MyLovelaceCard extends LitElement {
    config: {
        type: string;
        title?: string;
        [key: string]: any;
    };
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-lovelace-card': MyLovelaceCard;
    }
}
//# sourceMappingURL=lovelace-card.d.ts.map