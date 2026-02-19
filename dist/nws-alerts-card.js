function t(t,e,r,i){var s,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(o<3?s(n):o>3?s(e,r,n):s(e,r))||n);return o>3&&n&&Object.defineProperty(e,r,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new o(r,t,i)},a=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,_=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},y=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);s?.call(this,e),this.requestUpdate(t,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(r)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of i){const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(void 0!==i&&!0===r.reflect){const s=(void 0!==r.converter?.toAttribute?r.converter:$).toAttribute(e,r.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=r.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const o=s.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,r){if(void 0!==t){const i=this.constructor,s=this[t];if(r??=i.getPropertyOptions(t),!((r.hasChanged??y)(s,e)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:s},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,r,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=w.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+S,k=`<${T}>`,P=document,O=()=>P.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,R=/>/g,F=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),j=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,Y=P.createTreeWalker(P,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const V=(t,e)=>{const r=t.length-1,i=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<r;e++){const r=t[e];let a,l,c=-1,d=0;for(;d<r.length&&(n.lastIndex=d,l=n.exec(r),null!==l);)d=n.lastIndex,n===z?"!--"===l[1]?n=U:void 0!==l[1]?n=R:void 0!==l[2]?(I.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=F):void 0!==l[3]&&(n=F):n===F?">"===l[0]?(n=s??z,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?F:'"'===l[3]?B:H):n===B||n===H?n=F:n===U||n===R?n=z:(n=F,s=void 0);const h=n===F&&t[e+1].startsWith("/>")?" ":"";o+=n===z?r+k:c>=0?(i.push(a),r.slice(0,c)+E+r.slice(c)+S+h):r+S+(-2===c?e:h)}return[G(t,o+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[l,c]=V(t,e);if(this.el=Z.createElement(l,r),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=c[o++],r=i.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:r,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?rt:X}),i.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],O()),Y.nextNode(),a.push({type:2,index:++s});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===T)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)a.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){const r=P.createElement("template");return r.innerHTML=t,r}}function Q(t,e,r=t,i){if(e===j)return e;let s=void 0!==i?r._$Co?.[i]:r._$Cl;const o=D(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,r,i)),void 0!==i?(r._$Co??=[])[i]=s:r._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);Y.currentNode=i;let s=Y.nextNode(),o=0,n=0,a=r[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new K(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new it(s,this,t)),this._$AV.push(e),a=r[++n]}o!==a?.index&&(s=Y.nextNode(),o++)}return Y.currentNode=P,i}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),D(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=Z.createElement(G(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new J(i,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const s of t)i===e.length?e.push(r=new K(this.O(O()),this.O(O()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=W}_$AI(t,e=this,r,i){const s=this.strings;let o=!1;if(void 0===s)t=Q(this,t,e,0),o=!D(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{const i=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Q(this,i[r+n],e,n),a===j&&(a=this._$AH[n]),o||=!D(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends X{constructor(t,e,r,i,s){super(t,e,r,i,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===j)return;const r=this._$AH,i=t===W&&r!==W||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==W&&(r===W||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(Z,K),(w.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const i=r?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=r?.renderBefore??null;i._$litPart$=s=new K(e.insertBefore(O(),t),t,void 0,r??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>(e,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},dt=(t=ct,e,r)=>{const{kind:i,metadata:s}=r;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(r.name,t),"accessor"===i){const{name:i}=r;return{set(r){const s=e.get.call(this);e.set.call(this,r),this.requestUpdate(i,s,t)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=r;return function(r){const s=this[i];e.call(this,r),this.requestUpdate(i,s,t)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ht(t){return(e,r)=>"object"==typeof r?dt(t,e,r):((t,e,r)=>{const i=e.hasOwnProperty(r);return e.constructor.createProperty(r,t),i?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ht({...t,state:!0,attribute:!1})}const ut=[[["tornado"],"mdi:weather-tornado"],[["thunderstorm","t-storm"],"mdi:weather-lightning"],[["flood","hydrologic"],"mdi:home-flood"],[["snow","blizzard","winter"],"mdi:weather-snowy-heavy"],[["ice","freeze","frost"],"mdi:snowflake"],[["landslide","avalanche"],"mdi:landslide"],[["wind"],"mdi:weather-windy"],[["fire","red flag"],"mdi:fire"],[["heat"],"mdi:weather-sunny-alert"],[["fog"],"mdi:weather-fog"],[["hurricane","tropical"],"mdi:weather-hurricane"]];function gt(t){const e=t.toLowerCase();for(const[t,r]of ut)if(t.some(t=>e.includes(t)))return r;return"mdi:alert-circle-outline"}const ft=[[["likely"],"mdi:check-decagram"],[["observed"],"mdi:eye-check"],[["possible","unlikely"],"mdi:help-circle-outline"]];const mt=[[["tornado warning"],"#FF0000","255, 0, 0"],[["tornado watch"],"#FFFF00","255, 255, 0"],[["extreme wind warning"],"#FF8C00","255, 140, 0"],[["hurricane warning"],"#DC143C","220, 20, 60"],[["excessive heat warning"],"#C71585","199, 21, 133"],[["flash flood warning","flash flood stmt"],"#8B0000","139, 0, 0"],[["flash flood watch"],"#2E8B57","46, 139, 87"],[["flash flood advisory"],"#00FF7F","0, 255, 127"],[["severe thunderstorm warning"],"#FFA500","255, 165, 0"],[["severe thunderstorm watch"],"#DB7093","219, 112, 147"],[["blizzard warning"],"#FF4500","255, 69, 0"],[["ice storm warning"],"#8B008B","139, 0, 139"],[["winter storm warning"],"#FF69B4","255, 105, 180"],[["winter storm watch"],"#4682B4","70, 130, 180"],[["high wind warning"],"#DAA520","218, 165, 32"],[["wind chill warning"],"#B0C4DE","176, 196, 222"],[["red flag warning","fire weather watch"],"#FF4500","255, 69, 0"],[["tsunami warning"],"#FD6347","253, 99, 71"],[["heat advisory"],"#FF7F50","255, 127, 80"],[["dense fog advisory"],"#708090","112, 128, 144"],[["frost advisory"],"#6495ED","100, 149, 237"],[["freeze warning"],"#483D8B","72, 61, 139"],[["wind advisory"],"#D2B48C","210, 180, 140"],[["winter weather advisory"],"#7B68EE","123, 104, 238"],[["tornado"],"#FF0000","255, 0, 0"],[["hurricane","typhoon","tropical storm"],"#DC143C","220, 20, 60"],[["flood"],"#228B22","34, 139, 34"],[["blizzard","ice storm"],"#FF4500","255, 69, 0"],[["snow","winter","blizzard"],"#1E90FF","30, 144, 255"],[["freeze","frost","ice"],"#6495ED","100, 149, 237"],[["wind"],"#D2B48C","210, 180, 140"],[["heat"],"#FF7F50","255, 127, 80"],[["fire","red flag"],"#FF4500","255, 69, 0"],[["fog"],"#708090","112, 128, 144"],[["tsunami"],"#FD6347","253, 99, 71"]];function vt(t){if(!t||"None"===t||""===t.trim())return 0;const e=new Date(t.trim());return isNaN(e.getTime())?0:e.getTime()/1e3}function _t(t,e){const r=e?.language,i=e?.date_format;if(!i||"language"===i)return t.toLocaleDateString(r);const s=new Intl.DateTimeFormat(r,{day:"numeric",month:"numeric",year:"numeric"}).formatToParts(t),o=s.find(t=>"day"===t.type)?.value??"",n=s.find(t=>"month"===t.type)?.value??"",a=s.find(t=>"year"===t.type)?.value??"";switch(i){case"DMY":return`${o}/${n}/${a}`;case"MDY":return`${n}/${o}/${a}`;case"YMD":return`${a}/${n}/${o}`;default:return t.toLocaleDateString(r)}}function $t(t,e,r){const i=function(t){if(!t)return{locale:void 0};const e=t.language;return"12"===t.time_format?{locale:e,hour12:!0}:"24"===t.time_format?{locale:e,hour12:!1}:{locale:e}}(e),s={hour:r,minute:"2-digit"};return void 0!==i.hour12&&(s.hour12=i.hour12),t.toLocaleTimeString(i.locale,s)}function yt(t,e){if(t<=0)return"N/A";const r=new Date(1e3*t),i=new Date,s=$t(r,e,"2-digit");return r.getFullYear()===i.getFullYear()&&r.getMonth()===i.getMonth()&&r.getDate()===i.getDate()?s:`${s} (${_t(r,e)})`}function bt(t,e){if(t<=100)return"N/A";const r=new Date(1e3*t),i=$t(r,e,"numeric");return`${_t(r,e)}, ${i}`}function xt(t){const e=(t||"").toLowerCase().replace(/\s/g,"");return["extreme","severe","moderate","minor"].includes(e)?e:"unknown"}const wt={extreme:0,severe:1,moderate:2,minor:3,unknown:4};function At(t){if(!t.Onset||"None"===t.Onset||""===t.Onset.trim())return 1/0;const e=new Date(t.Onset.trim());return isNaN(e.getTime())?1/0:e.getTime()}function Ct(t){const e=t.split("/");return e[e.length-1].toUpperCase()}const Et=n`
  @keyframes pulse-border {
    0% { box-shadow: 0 0 0 0 rgba(var(--color-rgb), 0.7); }
    70% { box-shadow: 0 0 0 6px rgba(var(--color-rgb), 0); }
    100% { box-shadow: 0 0 0 0 rgba(var(--color-rgb), 0); }
  }

  @keyframes ongoing-pulse {
    0% { background: rgba(var(--color-rgb), 0.8); }
    50% { background: rgba(var(--color-rgb), 0.5); }
    100% { background: rgba(var(--color-rgb), 0.8); }
  }

  :host {
    display: block;
  }

  .error {
    padding: 16px;
    color: var(--error-color, red);
  }

  .sensor-unavailable {
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--secondary-text-color);
    font-style: italic;
  }

  /* --- COLOR MAPPING --- */
  .severity-extreme,
  .severity-severe { --color: var(--error-color); --color-rgb: 244, 67, 54; }
  .severity-moderate { --color: var(--warning-color); --color-rgb: 255, 152, 0; }
  .severity-minor { --color: var(--info-color); --color-rgb: 33, 150, 243; }
  .severity-unknown { --color: var(--secondary-text-color); --color-rgb: 128, 128, 128; }

  /* --- CARD CONTAINER --- */
  .alert-card {
    position: relative;
    margin-bottom: 16px;
    padding: 0;
    border-radius: 12px;
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    box-shadow: var(--ha-card-box-shadow, 0 2px 5px rgba(0,0,0,0.1));
    overflow: hidden;
    transition: all 0.2s ease-in-out;
  }

  .alert-card:last-child {
    margin-bottom: 0;
  }

  .alert-card::before {
    content: "";
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 6px;
    background: var(--color);
  }

  .alert-card.severity-extreme,
  .alert-card.severity-severe {
    animation: pulse-border 2s infinite;
    border-color: var(--color);
  }

  /* --- HEADER --- */
  .alert-header-row {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 16px;
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--color-rgb), 0.1);
    color: var(--color);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .icon-box ha-icon { --mdc-icon-size: 26px; }

  .info-box { flex-grow: 1; }

  .title-row { margin-bottom: 6px; }
  .alert-title {
    font-size: 1.15rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
  }

  .badges-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1;
    font-size: 0.75rem;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .severity-badge {
    background: var(--color);
    color: var(--text-primary-color, white);
  }
  .certainty-badge {
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
    border: 1px solid var(--divider-color);
  }
  .active-badge {
    background: rgba(var(--color-rgb), 0.15);
    color: var(--color);
    font-weight: 700;
  }
  .prep-badge {
    background: var(--primary-background-color);
    color: var(--secondary-text-color);
    border: 1px solid var(--divider-color);
    font-style: italic;
  }

  /* --- PROGRESS --- */
  .progress-section {
    padding: 0 16px 16px 16px;
  }

  .progress-labels {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 0.85rem;
    color: var(--primary-text-color);
    margin-bottom: 6px;
  }

  .label-sub {
    font-size: 0.7rem;
    color: var(--secondary-text-color);
    text-transform: uppercase;
  }
  .label-center {
    font-weight: bold;
    color: var(--color);
  }
  .label-right { text-align: right; }

  .progress-track {
    height: 8px;
    background: var(--secondary-background-color);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    position: absolute;
    top: 0;
    transition: width 0.3s ease;
  }

  .active .progress-fill {
    background: linear-gradient(90deg, var(--color) 0%, rgba(var(--color-rgb), 0.6) 100%);
  }

  .preparation .progress-fill {
    background-color: transparent;
    background-image: repeating-linear-gradient(
      -45deg,
      var(--color) 0,
      var(--color) 8px,
      transparent 8px,
      transparent 16px
    );
    opacity: 0.6;
  }

  /* --- DETAILS (custom toggle, not native <details>) --- */
  .alert-details-section {
    border-top: 1px solid var(--divider-color);
    background: rgba(var(--rgb-primary-text-color), 0.02);
  }

  .details-summary {
    padding: 10px 16px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s;
    user-select: none;
  }
  .details-summary:hover {
    background: rgba(var(--color-rgb), 0.05);
    color: var(--primary-text-color);
  }

  .chevron {
    transition: transform 0.2s;
  }
  .chevron.expanded {
    transform: rotate(180deg);
  }

  .details-content {
    padding: 16px;
    font-size: 0.9rem;
  }

  /* Details Grid */
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px dashed var(--divider-color);
  }

  .meta-item { display: flex; flex-direction: column; }
  .meta-label {
    font-size: 0.7rem;
    color: var(--secondary-text-color);
    text-transform: uppercase;
  }
  .meta-value {
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .text-block { margin-bottom: 16px; }
  .text-label {
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--primary-text-color);
  }
  .text-body {
    white-space: pre-wrap;
    color: var(--secondary-text-color);
    line-height: 1.5;
    background: var(--primary-background-color);
    padding: 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
  }

  .footer-link { text-align: right; margin-top: 10px; }
  .footer-link a {
    color: var(--color);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.85rem;
  }

  /* --- COMPACT LAYOUT --- */
  .compact .alert-card {
    margin-bottom: 4px;
    border-radius: 8px;
  }

  .compact .alert-card::before {
    display: none;
  }

  .compact .alert-header-row.compact-row {
    padding: 8px 12px;
    gap: 10px;
    cursor: pointer;
    user-select: none;
  }
  .compact .alert-header-row.compact-row:hover {
    background: rgba(var(--color-rgb), 0.05);
  }

  .compact .icon-box {
    width: 32px;
    height: 32px;
  }
  .compact .icon-box ha-icon {
    --mdc-icon-size: 18px;
  }

  .compact .alert-title {
    font-size: 0.95rem;
    flex-grow: 1;
  }

  .compact-chevron {
    color: var(--secondary-text-color);
    transition: transform 0.2s;
    flex-shrink: 0;
    --mdc-icon-size: 20px;
  }
  .compact-chevron.expanded {
    transform: rotate(180deg);
  }

  .compact .alert-expanded {
    padding-top: 4px;
    border-top: 1px solid var(--divider-color);
  }

  /* --- NO ANIMATIONS --- */
  .no-animations .alert-card {
    animation: none !important;
  }
  .no-animations .progress-fill {
    animation: none !important;
    transition: none !important;
  }

  /* --- EMPTY STATE --- */
  .no-alerts {
    padding: 20px;
    opacity: 0.6;
    text-align: center;
    font-style: italic;
  }
  .no-alerts ha-icon {
    margin-bottom: 10px;
  }
`;let St=class extends nt{setConfig(t){this._config=t}_fireConfigChanged(t){this._config=t;const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_entityChanged(t){const e=t.detail.value;e!==this._config.entity&&this._fireConfigChanged({...this._config,entity:e})}_titleChanged(t){const e=t.target.value;if(e===(this._config.title||""))return;const r={...this._config};e?r.title=e:delete r.title,this._fireConfigChanged(r)}_animationsChanged(t){const e=t.target.checked;if(e===(!1!==this._config.animations))return;const r={...this._config};e?delete r.animations:r.animations=!1,this._fireConfigChanged(r)}_layoutChanged(t){const e=t.target.checked;if(e===("compact"===this._config.layout))return;const r={...this._config};e?r.layout="compact":delete r.layout,this._fireConfigChanged(r)}_zonesChanged(t){const e=t.target.value,r={...this._config};e.trim()?r.zones=e.split(",").map(t=>t.trim()).filter(Boolean):delete r.zones,this._fireConfigChanged(r)}_sortOrderChanged(t){const e=t.target.value;if(e===(this._config.sortOrder||"default"))return;const r={...this._config};"default"===e?delete r.sortOrder:r.sortOrder=e,this._fireConfigChanged(r)}_colorThemeChanged(t){const e=t.target.value;if(e===(this._config.colorTheme||"severity"))return;const r={...this._config};"severity"===e?delete r.colorTheme:r.colorTheme=e,this._fireConfigChanged(r)}render(){if(!this.hass||!this._config)return L``;const t=this._config.zones?this._config.zones.join(", "):"";return L`
      <div class="editor">
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"sensor"}}}
          .value=${this._config.entity}
          .label=${"Entity (required)"}
          .required=${!0}
          @value-changed=${this._entityChanged}
        ></ha-selector>

        <ha-textfield
          .label=${"Title (optional)"}
          .value=${this._config.title||""}
          @change=${this._titleChanged}
        ></ha-textfield>

        <ha-textfield
          .label=${"Zones (optional)"}
          .value=${t}
          .helper=${"Comma-separated zone codes, e.g. COC059, COZ039"}
          .helperPersistent=${!0}
          @change=${this._zonesChanged}
        ></ha-textfield>

        <ha-select
          .label=${"Sort order"}
          .value=${this._config.sortOrder||"default"}
          @selected=${this._sortOrderChanged}
          @closed=${t=>t.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
        >
          <ha-list-item value="default">Default</ha-list-item>
          <ha-list-item value="onset">Onset time</ha-list-item>
          <ha-list-item value="severity">Severity</ha-list-item>
        </ha-select>

        <ha-select
          .label=${"Color theme"}
          .value=${this._config.colorTheme||"severity"}
          @selected=${this._colorThemeChanged}
          @closed=${t=>t.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
        >
          <ha-list-item value="severity">Severity-based</ha-list-item>
          <ha-list-item value="nws">NWS Official</ha-list-item>
        </ha-select>

        <ha-formfield .label=${"Enable animations"}>
          <ha-switch
            .checked=${!1!==this._config.animations}
            @change=${this._animationsChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${"Compact layout"}>
          <ha-switch
            .checked=${"compact"===this._config.layout}
            @change=${this._layoutChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `}};St.styles=n`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }
  `,t([ht({attribute:!1})],St.prototype,"hass",void 0),t([pt()],St.prototype,"_config",void 0),St=t([lt("nws-alerts-card-editor")],St);let Tt=class extends nt{constructor(){super(...arguments),this._expandedAlerts=new Map,this._motionQuery=window.matchMedia("(prefers-reduced-motion: reduce)"),this._onMotionChange=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._motionQuery.addEventListener("change",this._onMotionChange)}disconnectedCallback(){super.disconnectedCallback(),this._motionQuery.removeEventListener("change",this._onMotionChange)}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this._config=t}getCardSize(){const t=this._getAlerts(),e=this._isCompact?1:3;return Math.max(1,t.length*e)}static getConfigElement(){return document.createElement("nws-alerts-card-editor")}static getStubConfig(){return{entity:"sensor.nws_alerts_alerts"}}_getAlerts(){if(!this.hass||!this._config)return[];const t=this.hass.states[this._config.entity];if(!t)return[];const e=t.attributes.Alerts||[];let r=e;if(this._config.zones&&this._config.zones.length>0){const t=new Set(this._config.zones.map(t=>t.toUpperCase()));r=e.filter(e=>function(t,e){if(t.AffectedZones)for(const r of t.AffectedZones)if(e.has(Ct(r)))return!0;if(t.Geocode?.UGC)for(const r of t.Geocode.UGC)if(e.has(r.toUpperCase()))return!0;return!1}(e,t))}return function(t,e){return"onset"===e?[...t].sort((t,e)=>At(t)-At(e)):"severity"===e?[...t].sort((t,e)=>{const r=(wt[xt(t.Severity)]??4)-(wt[xt(e.Severity)]??4);return 0!==r?r:At(t)-At(e)}):t}(r,this._config.sortOrder||"default")}get _animationsEnabled(){return!0===this._config?.animations||!1!==this._config?.animations&&!this._motionQuery.matches}get _isCompact(){return"compact"===this._config?.layout}get _colorTheme(){return this._config?.colorTheme||"severity"}_alertColorStyle(t){if("nws"!==this._colorTheme)return"";const{color:e,rgb:r}=function(t){const e=t.toLowerCase();for(const[t,r,i]of mt)if(t.some(t=>e.includes(t)))return{color:r,rgb:i};return{color:"#808080",rgb:"128, 128, 128"}}(t);return`--color: ${e}; --color-rgb: ${r};`}_normalizeText(t){return(t||"").replace(/\n{2,}/g,"\n\n").trim()}_toggleDetails(t){const e=new Map(this._expandedAlerts);e.set(t,!e.get(t)),this._expandedAlerts=e}render(){if(!this._config||!this.hass)return L``;const t=this.hass.states[this._config.entity];if(!t)return L`
        <ha-card .header=${this._config.title||""}>
          <div class="error">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;const e=t.state;if("unavailable"===e||"unknown"===e)return L`
        <ha-card .header=${this._config.title||""}>
          <div class="sensor-unavailable">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            NWS Alerts sensor is ${e}.
          </div>
        </ha-card>
      `;const r=this._getAlerts(),i=this._animationsEnabled?"":"no-animations",s=this._isCompact?"compact":"";return L`
      <ha-card .header=${this._config.title||""} class="${i} ${s}">
        ${0===r.length?this._renderNoAlerts():r.map(t=>this._renderAlert(t))}
      </ha-card>
    `}_renderNoAlerts(){return L`
      <div class="no-alerts">
        <ha-icon icon="mdi:weather-sunny"></ha-icon><br>
        No active NWS alerts.
      </div>
    `}_renderAlert(t){const e=`severity-${xt(t.Severity)}`,r=function(t){const e=Date.now()/1e3,r=vt(t.Sent),i=r>0?r:e;let s=vt(t.Onset);0===s&&(s=i);const o=s+3600;let n=vt(t.Ends||t.Expires||"");0===n&&(n=o);const a=!(!t.Ends&&!t.Expires),l=e>=s;let c,d,h,p;l?(c=s,d=n,h=e,p="Active"):(c=e,d=n,h=s,p="Preparation");const u=d-c,g=(h-c)/(u>0?u:1)*100;return{isActive:l,phaseText:p,progressPct:Math.max(0,Math.min(100,Math.round(10*g)/10)),remainingHours:Math.round((n-e)/3600*10)/10,onsetHours:Math.round((s-e)/3600*10)/10,onsetMinutes:Math.round((s-e)/60),onsetTs:s,endsTs:n,sentTs:r,nowTs:e,hasEndTime:a}}(t),i=r.phaseText.toLowerCase(),s=this._expandedAlerts.get(t.ID)||!1;return this._isCompact?this._renderCompactAlert(t,e,i,r,s):this._renderFullAlert(t,e,i,r,s)}_renderCompactAlert(t,e,r,i,s){return L`
      <div class="alert-card ${e} ${r}" style=${this._alertColorStyle(t.Event)}>
        <div
          class="alert-header-row compact-row"
          @click=${()=>this._toggleDetails(t.ID)}
        >
          <div class="icon-box">
            <ha-icon icon=${gt(t.Event)}></ha-icon>
          </div>
          <span class="alert-title">${t.Event||"Unknown"}</span>
          <ha-icon
            icon="mdi:chevron-down"
            class="compact-chevron ${s?"expanded":""}"
          ></ha-icon>
        </div>
        ${s?this._renderExpandedContent(t,i):W}
      </div>
    `}_renderExpandedContent(t,e){return this._normalizeText(t.Description),this._normalizeText(t.Instruction),L`
      <div class="alert-expanded">
        <div class="badges-row" style="padding: 0 12px 8px;">
          ${this._renderBadgesRow(t,e)}
        </div>

        ${this._renderProgressSection(t,e)}

        <div class="alert-details-section">
          <div
            class="details-summary"
            @click=${()=>this._toggleDetails(t.ID+"_details")}
          >
            <span>Read Details</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${this._expandedAlerts.get(t.ID+"_details")?"expanded":""}"
            ></ha-icon>
          </div>
          ${this._expandedAlerts.get(t.ID+"_details")?this._renderDetailsContent(t,e):W}
        </div>
      </div>
    `}_renderFullAlert(t,e,r,i,s){return L`
      <div class="alert-card ${e} ${r}" style=${this._alertColorStyle(t.Event)}>
        <div class="alert-header-row">
          <div class="icon-box">
            <ha-icon icon=${gt(t.Event)}></ha-icon>
          </div>
          <div class="info-box">
            <div class="title-row">
              <span class="alert-title">${t.Event||"Unknown"}</span>
            </div>
            <div class="badges-row">
              ${this._renderBadgesRow(t,i)}
            </div>
          </div>
        </div>

        ${this._renderProgressSection(t,i)}

        <div class="alert-details-section">
          <div
            class="details-summary"
            @click=${()=>this._toggleDetails(t.ID)}
          >
            <span>Read Details</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${s?"expanded":""}"
            ></ha-icon>
          </div>
          ${s?this._renderDetailsContent(t,i):W}
        </div>
      </div>
    `}_renderBadgesRow(t,e){return L`
      <span class="badge severity-badge">${t.Severity}</span>
      <span class="badge certainty-badge">
        <ha-icon
          icon=${function(t){const e=t.toLowerCase();for(const[t,r]of ft)if(t.some(t=>e.includes(t)))return r;return"mdi:bullseye-arrow"}(t.Certainty)}
          style="--mdc-icon-size: 14px; width: 14px; height: 14px;"
        ></ha-icon>
        ${t.Certainty}
      </span>
      ${e.isActive?L`<span class="badge active-badge">Active</span>`:L`<span class="badge prep-badge">In Prep</span>`}
    `}_renderTextBlock(t,e){return e?L`
      <div class="text-block">
        <div class="text-label">${t}</div>
        <div class="text-body">${e}</div>
      </div>
    `:W}_renderDetailsContent(t,e){const r=this._normalizeText(t.Description),i=this._normalizeText(t.Instruction);return L`
      <div class="details-content">
        <div class="meta-grid">
          <div class="meta-item">
            <span class="meta-label">Issued</span>
            <span class="meta-value">${bt(e.sentTs,this.hass.locale)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Onset</span>
            <span class="meta-value">${bt(e.onsetTs,this.hass.locale)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Expires</span>
            <span class="meta-value">${bt(e.endsTs,this.hass.locale)}</span>
          </div>
        </div>

        ${this._renderTextBlock("Description",r)}
        ${this._renderTextBlock("Instructions",i)}

        <div class="footer-link">
          <a href=${t.URL||"#"} target="_blank">
            Open NWS Source
            <ha-icon icon="mdi:open-in-new" style="width:14px;"></ha-icon>
          </a>
        </div>
      </div>
    `}_renderProgressSection(t,e){const{isActive:r,progressPct:i,hasEndTime:s,onsetMinutes:o,onsetHours:n,onsetTs:a,endsTs:l,nowTs:c}=e,d=!this._animationsEnabled,h=r&&!s?d?"width: 100%; left: 0; opacity: 0.8;":"width: 100%; left: 0; animation: ongoing-pulse 5s infinite; opacity: 0.8;":`width: ${100-i}%; left: ${i}%;`;return L`
      <div class="progress-section">
        <div class="progress-labels">
          <div class="label-left">
            <span class="label-sub">${r?"Start":"Now"}</span><br>
            ${yt(r?a:c,this.hass.locale)}
          </div>
          <div class="label-center">
            ${s?r?L`${Math.round(i)}% Elapsed`:L`starts in <b>${o<60?o:n}</b> ${o<60?"min":"hrs"}`:L`<span style="color: var(--color);"><b>Ongoing</b></span>`}
          </div>
          <div class="label-right">
            <span class="label-sub">End</span><br>
            ${s?yt(l,this.hass.locale):"TBD"}
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style=${h}></div>
        </div>
      </div>
    `}};Tt.styles=Et,t([ht({attribute:!1})],Tt.prototype,"hass",void 0),t([pt()],Tt.prototype,"_config",void 0),t([pt()],Tt.prototype,"_expandedAlerts",void 0),Tt=t([lt("nws-alerts-card")],Tt);const kt=window;kt.customCards=kt.customCards||[],kt.customCards.push({type:"nws-alerts-card",name:"NWS Alerts Card",description:"A card for displaying NWS weather alerts with severity indicators, progress bars, and expandable details."});export{Tt as NwsAlertsCard};
