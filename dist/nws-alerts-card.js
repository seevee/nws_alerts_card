function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,_=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=A.trustedTypes,C=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+S,T=`<${k}>`,P=document,O=()=>P.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,N="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,R=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Y=new WeakMap,G=P.createTreeWalker(P,129);function V(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===U?"!--"===l[1]?n=z:void 0!==l[1]?n=R:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=H):void 0!==l[3]&&(n=H):n===H?">"===l[0]?(n=r??U,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?H:'"'===l[3]?L:I):n===L||n===I?n=H:n===z||n===R?n=U:(n=H,r=void 0);const h=n===H&&t[e+1].startsWith("/>")?" ":"";o+=n===U?i+T:c>=0?(s.push(a),i.slice(0,c)+E+i.slice(c)+S+h):i+S+(-2===c?e:h)}return[V(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,c]=F(t,e);if(this.el=Z.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=c[o++],i=s.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),G.nextNode(),a.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===W)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=M(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);G.currentNode=s;let r=G.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=G.nextNode(),o++)}return G.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),M(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=J(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=J(this,s[i+n],e,n),a===W&&(a=this._$AH[n]),o||=!M(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(Z,Q),(A.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},dt=(t=ct,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ht({...t,state:!0,attribute:!1})}const ut=[[["tornado"],"mdi:weather-tornado"],[["thunderstorm","t-storm"],"mdi:weather-lightning"],[["flood","hydrologic"],"mdi:home-flood"],[["snow","blizzard","winter"],"mdi:weather-snowy-heavy"],[["ice","freeze","frost"],"mdi:snowflake"],[["landslide","avalanche"],"mdi:landslide"],[["wind"],"mdi:weather-windy"],[["fire","red flag"],"mdi:fire"],[["heat"],"mdi:weather-sunny-alert"],[["fog"],"mdi:weather-fog"],[["hurricane","tropical"],"mdi:weather-hurricane"]];function gt(t){const e=t.toLowerCase();for(const[t,i]of ut)if(t.some(t=>e.includes(t)))return i;return"mdi:alert-circle-outline"}const ft=[[["likely"],"mdi:check-decagram"],[["observed"],"mdi:eye-check"],[["possible","unlikely"],"mdi:help-circle-outline"]];function mt(t){if(!t||"None"===t||""===t.trim())return 0;const e=new Date(t.trim());return isNaN(e.getTime())?0:e.getTime()/1e3}function vt(t,e){const i=e?.language,s=e?.date_format;if(!s||"language"===s)return t.toLocaleDateString(i);const r=new Intl.DateTimeFormat(i,{day:"numeric",month:"numeric",year:"numeric"}).formatToParts(t),o=r.find(t=>"day"===t.type)?.value??"",n=r.find(t=>"month"===t.type)?.value??"",a=r.find(t=>"year"===t.type)?.value??"";switch(s){case"DMY":return`${o}/${n}/${a}`;case"MDY":return`${n}/${o}/${a}`;case"YMD":return`${a}/${n}/${o}`;default:return t.toLocaleDateString(i)}}function _t(t,e,i){const s=function(t){if(!t)return{locale:void 0};const e=t.language;return"12"===t.time_format?{locale:e,hour12:!0}:"24"===t.time_format?{locale:e,hour12:!1}:{locale:e}}(e),r={hour:i,minute:"2-digit"};return void 0!==s.hour12&&(r.hour12=s.hour12),t.toLocaleTimeString(s.locale,r)}function $t(t,e){if(t<=0)return"N/A";const i=new Date(1e3*t),s=new Date,r=_t(i,e,"2-digit");return i.getFullYear()===s.getFullYear()&&i.getMonth()===s.getMonth()&&i.getDate()===s.getDate()?r:`${r} (${vt(i,e)})`}function bt(t,e){if(t<=100)return"N/A";const i=new Date(1e3*t),s=_t(i,e,"numeric");return`${vt(i,e)}, ${s}`}function yt(t){const e=(t||"").toLowerCase().replace(/\s/g,"");return["extreme","severe","moderate","minor"].includes(e)?e:"unknown"}const xt={extreme:0,severe:1,moderate:2,minor:3,unknown:4};function At(t){if(!t.Onset||"None"===t.Onset||""===t.Onset.trim())return 1/0;const e=new Date(t.Onset.trim());return isNaN(e.getTime())?1/0:e.getTime()}function wt(t){const e=t.split("/");return e[e.length-1].toUpperCase()}const Ct=n`
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
`;let Et=class extends nt{setConfig(t){this._config=t}_fireConfigChanged(t){this._config=t;const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_entityChanged(t){const e=t.detail.value;e!==this._config.entity&&this._fireConfigChanged({...this._config,entity:e})}_titleChanged(t){const e=t.target.value;if(e===(this._config.title||""))return;const i={...this._config};e?i.title=e:delete i.title,this._fireConfigChanged(i)}_animationsChanged(t){const e=t.target.checked;if(e===(!1!==this._config.animations))return;const i={...this._config};e?delete i.animations:i.animations=!1,this._fireConfigChanged(i)}_layoutChanged(t){const e=t.target.checked;if(e===("compact"===this._config.layout))return;const i={...this._config};e?i.layout="compact":delete i.layout,this._fireConfigChanged(i)}_zonesChanged(t){const e=t.target.value,i={...this._config};e.trim()?i.zones=e.split(",").map(t=>t.trim()).filter(Boolean):delete i.zones,this._fireConfigChanged(i)}_sortOrderChanged(t){const e=t.target.value;if(e===(this._config.sortOrder||"default"))return;const i={...this._config};"default"===e?delete i.sortOrder:i.sortOrder=e,this._fireConfigChanged(i)}render(){if(!this.hass||!this._config)return B``;const t=this._config.zones?this._config.zones.join(", "):"";return B`
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
    `}};Et.styles=n`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }
  `,t([ht({attribute:!1})],Et.prototype,"hass",void 0),t([pt()],Et.prototype,"_config",void 0),Et=t([lt("nws-alerts-card-editor")],Et);let St=class extends nt{constructor(){super(...arguments),this._expandedAlerts=new Map}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this._config=t}getCardSize(){const t=this._getAlerts(),e=this._isCompact?1:3;return Math.max(1,t.length*e)}static getConfigElement(){return document.createElement("nws-alerts-card-editor")}static getStubConfig(){return{entity:"sensor.nws_alerts_alerts"}}_getAlerts(){if(!this.hass||!this._config)return[];const t=this.hass.states[this._config.entity];if(!t)return[];const e=t.attributes.Alerts||[];let i=e;if(this._config.zones&&this._config.zones.length>0){const t=new Set(this._config.zones.map(t=>t.toUpperCase()));i=e.filter(e=>function(t,e){if(t.AffectedZones)for(const i of t.AffectedZones)if(e.has(wt(i)))return!0;if(t.Geocode?.UGC)for(const i of t.Geocode.UGC)if(e.has(i.toUpperCase()))return!0;return!1}(e,t))}return function(t,e){return"onset"===e?[...t].sort((t,e)=>At(t)-At(e)):"severity"===e?[...t].sort((t,e)=>{const i=(xt[yt(t.Severity)]??4)-(xt[yt(e.Severity)]??4);return 0!==i?i:At(t)-At(e)}):t}(i,this._config.sortOrder||"default")}get _animationsEnabled(){return!1!==this._config?.animations}get _isCompact(){return"compact"===this._config?.layout}_normalizeText(t){return(t||"").replace(/\n{2,}/g,"\n\n").trim()}_toggleDetails(t){const e=new Map(this._expandedAlerts);e.set(t,!e.get(t)),this._expandedAlerts=e}render(){if(!this._config||!this.hass)return B``;const t=this.hass.states[this._config.entity];if(!t)return B`
        <ha-card .header=${this._config.title||""}>
          <div class="error">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;const e=t.state;if("unavailable"===e||"unknown"===e)return B`
        <ha-card .header=${this._config.title||""}>
          <div class="sensor-unavailable">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            NWS Alerts sensor is ${e}.
          </div>
        </ha-card>
      `;const i=this._getAlerts(),s=this._animationsEnabled?"":"no-animations",r=this._isCompact?"compact":"";return B`
      <ha-card .header=${this._config.title||""} class="${s} ${r}">
        ${0===i.length?this._renderNoAlerts():i.map(t=>this._renderAlert(t))}
      </ha-card>
    `}_renderNoAlerts(){return B`
      <div class="no-alerts">
        <ha-icon icon="mdi:weather-sunny"></ha-icon><br>
        No active NWS alerts.
      </div>
    `}_renderAlert(t){const e=`severity-${yt(t.Severity)}`,i=function(t){const e=Date.now()/1e3,i=mt(t.Sent),s=i>0?i:e;let r=mt(t.Onset);0===r&&(r=s);const o=r+3600;let n=mt(t.Ends||t.Expires||"");0===n&&(n=o);const a=!(!t.Ends&&!t.Expires),l=e>=r;let c,d,h,p;l?(c=r,d=n,h=e,p="Active"):(c=e,d=n,h=r,p="Preparation");const u=d-c,g=(h-c)/(u>0?u:1)*100;return{isActive:l,phaseText:p,progressPct:Math.max(0,Math.min(100,Math.round(10*g)/10)),remainingHours:Math.round((n-e)/3600*10)/10,onsetHours:Math.round((r-e)/3600*10)/10,onsetMinutes:Math.round((r-e)/60),onsetTs:r,endsTs:n,sentTs:i,nowTs:e,hasEndTime:a}}(t),s=i.phaseText.toLowerCase(),r=this._expandedAlerts.get(t.ID)||!1;return this._isCompact?this._renderCompactAlert(t,e,s,i,r):this._renderFullAlert(t,e,s,i,r)}_renderCompactAlert(t,e,i,s,r){return B`
      <div class="alert-card ${e} ${i}">
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
            class="compact-chevron ${r?"expanded":""}"
          ></ha-icon>
        </div>
        ${r?this._renderExpandedContent(t,s):q}
      </div>
    `}_renderExpandedContent(t,e){return this._normalizeText(t.Description),this._normalizeText(t.Instruction),B`
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
          ${this._expandedAlerts.get(t.ID+"_details")?this._renderDetailsContent(t,e):q}
        </div>
      </div>
    `}_renderFullAlert(t,e,i,s,r){return B`
      <div class="alert-card ${e} ${i}">
        <div class="alert-header-row">
          <div class="icon-box">
            <ha-icon icon=${gt(t.Event)}></ha-icon>
          </div>
          <div class="info-box">
            <div class="title-row">
              <span class="alert-title">${t.Event||"Unknown"}</span>
            </div>
            <div class="badges-row">
              ${this._renderBadgesRow(t,s)}
            </div>
          </div>
        </div>

        ${this._renderProgressSection(t,s)}

        <div class="alert-details-section">
          <div
            class="details-summary"
            @click=${()=>this._toggleDetails(t.ID)}
          >
            <span>Read Details</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${r?"expanded":""}"
            ></ha-icon>
          </div>
          ${r?this._renderDetailsContent(t,s):q}
        </div>
      </div>
    `}_renderBadgesRow(t,e){return B`
      <span class="badge severity-badge">${t.Severity}</span>
      <span class="badge certainty-badge">
        <ha-icon
          icon=${function(t){const e=t.toLowerCase();for(const[t,i]of ft)if(t.some(t=>e.includes(t)))return i;return"mdi:bullseye-arrow"}(t.Certainty)}
          style="--mdc-icon-size: 14px; width: 14px; height: 14px;"
        ></ha-icon>
        ${t.Certainty}
      </span>
      ${e.isActive?B`<span class="badge active-badge">Active</span>`:B`<span class="badge prep-badge">In Prep</span>`}
    `}_renderTextBlock(t,e){return e?B`
      <div class="text-block">
        <div class="text-label">${t}</div>
        <div class="text-body">${e}</div>
      </div>
    `:q}_renderDetailsContent(t,e){const i=this._normalizeText(t.Description),s=this._normalizeText(t.Instruction);return B`
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

        ${this._renderTextBlock("Description",i)}
        ${this._renderTextBlock("Instructions",s)}

        <div class="footer-link">
          <a href=${t.URL||"#"} target="_blank">
            Open NWS Source
            <ha-icon icon="mdi:open-in-new" style="width:14px;"></ha-icon>
          </a>
        </div>
      </div>
    `}_renderProgressSection(t,e){const{isActive:i,progressPct:s,hasEndTime:r,onsetMinutes:o,onsetHours:n,onsetTs:a,endsTs:l,nowTs:c}=e,d=!this._animationsEnabled,h=i&&!r?d?"width: 100%; left: 0; opacity: 0.8;":"width: 100%; left: 0; animation: ongoing-pulse 5s infinite; opacity: 0.8;":`width: ${100-s}%; left: ${s}%;`;return B`
      <div class="progress-section">
        <div class="progress-labels">
          <div class="label-left">
            <span class="label-sub">${i?"Start":"Now"}</span><br>
            ${$t(i?a:c,this.hass.locale)}
          </div>
          <div class="label-center">
            ${r?i?B`${Math.round(s)}% Elapsed`:B`starts in <b>${o<60?o:n}</b> ${o<60?"min":"hrs"}`:B`<span style="color: var(--color);"><b>Ongoing</b></span>`}
          </div>
          <div class="label-right">
            <span class="label-sub">End</span><br>
            ${r?$t(l,this.hass.locale):"TBD"}
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style=${h}></div>
        </div>
      </div>
    `}};St.styles=Ct,t([ht({attribute:!1})],St.prototype,"hass",void 0),t([pt()],St.prototype,"_config",void 0),t([pt()],St.prototype,"_expandedAlerts",void 0),St=t([lt("nws-alerts-card")],St);const kt=window;kt.customCards=kt.customCards||[],kt.customCards.push({type:"nws-alerts-card",name:"NWS Alerts Card",description:"A card for displaying NWS weather alerts with severity indicators, progress bars, and expandable details."});export{St as NwsAlertsCard};
