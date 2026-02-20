function e(e,t,n,r){var i,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,n,s):i(t,n))||s);return o>3&&s&&Object.defineProperty(t,n,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let o=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=i.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[r+1],e[0]);return new o(n,e,r)},a=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,v=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},b=(e,t)=>!l(e,t),A={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=A){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(e,n,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){const{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);i?.call(this,t),this.requestUpdate(e,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??A}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(n)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of r){const r=document.createElement("style"),i=t.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=n.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(void 0!==r&&!0===n.reflect){const i=(void 0!==n.converter?.toAttribute?n.converter:y).toAttribute(t,n.type);this._$Em=e,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){const n=this.constructor,r=n._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=n.getPropertyOptions(r),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=r;const o=i.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,n){if(void 0!==e){const r=this.constructor,i=this[e];if(n??=r.getPropertyOptions(e),!((n.hasChanged??b)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==i||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,n,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,_?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,x=$.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,N=`<${C}>`,D=document,k=()=>D.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,M="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,I=/>/g,z=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,F=/"/g,H=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),W=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),G=new WeakMap,Y=D.createTreeWalker(D,129);function Z(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const q=(e,t)=>{const n=e.length-1,r=[];let i,o=2===t?"<svg>":3===t?"<math>":"",s=L;for(let t=0;t<n;t++){const n=e[t];let a,l,c=-1,d=0;for(;d<n.length&&(s.lastIndex=d,l=s.exec(n),null!==l);)d=s.lastIndex,s===L?"!--"===l[1]?s=P:void 0!==l[1]?s=I:void 0!==l[2]?(H.test(l[2])&&(i=RegExp("</"+l[2],"g")),s=z):void 0!==l[3]&&(s=z):s===z?">"===l[0]?(s=i??L,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?z:'"'===l[3]?F:U):s===F||s===U?s=z:s===P||s===I?s=L:(s=z,i=void 0);const h=s===z&&e[t+1].startsWith("/>")?" ":"";o+=s===L?n+N:c>=0?(r.push(a),n.slice(0,c)+T+n.slice(c)+S+h):n+S+(-2===c?t:h)}return[Z(e,o+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class V{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let i=0,o=0;const s=e.length-1,a=this.parts,[l,c]=q(e,t);if(this.el=V.createElement(l,n),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=Y.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(T)){const t=c[o++],n=r.getAttribute(e).split(S),s=/([.?@])?(.*)/.exec(t);a.push({type:1,index:i,name:s[2],strings:n,ctor:"."===s[1]?ee:"?"===s[1]?te:"@"===s[1]?ne:J}),r.removeAttribute(e)}else e.startsWith(S)&&(a.push({type:6,index:i}),r.removeAttribute(e));if(H.test(r.tagName)){const e=r.textContent.split(S),t=e.length-1;if(t>0){r.textContent=x?x.emptyScript:"";for(let n=0;n<t;n++)r.append(e[n],k()),Y.nextNode(),a.push({type:2,index:++i});r.append(e[t],k())}}}else if(8===r.nodeType)if(r.data===C)a.push({type:2,index:i});else{let e=-1;for(;-1!==(e=r.data.indexOf(S,e+1));)a.push({type:7,index:i}),e+=S.length-1}i++}}static createElement(e,t){const n=D.createElement("template");return n.innerHTML=e,n}}function X(e,t,n=e,r){if(t===W)return t;let i=void 0!==r?n._$Co?.[r]:n._$Cl;const o=O(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),void 0===o?i=void 0:(i=new o(e),i._$AT(e,n,r)),void 0!==r?(n._$Co??=[])[r]=i:n._$Cl=i),void 0!==i&&(t=X(e,i._$AS(e,t.values),i,r)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);Y.currentNode=r;let i=Y.nextNode(),o=0,s=0,a=n[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new Q(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new re(i,this,e)),this._$AV.push(t),a=n[++s]}o!==a?.index&&(i=Y.nextNode(),o++)}return Y.currentNode=D,r}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),O(e)?e===j||null==e||""===e?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,r="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=V.createElement(Z(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new K(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new V(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,r=0;for(const i of e)r===t.length?t.push(n=new Q(this.O(k()),this.O(k()),this,this.options)):n=t[r],n._$AI(i),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=j}_$AI(e,t=this,n,r){const i=this.strings;let o=!1;if(void 0===i)e=X(this,e,t,0),o=!O(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{const r=e;let s,a;for(e=i[0],s=0;s<i.length-1;s++)a=X(this,r[n+s],t,s),a===W&&(a=this._$AH[s]),o||=!O(a)||a!==this._$AH[s],a===j?e=j:e!==j&&(e+=(a??"")+i[s+1]),this._$AH[s]=a}o&&!r&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}}class te extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}}class ne extends J{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??j)===W)return;const n=this._$AH,r=e===j&&n!==j||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==j&&(n===j||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ie=$.litHtmlPolyfillSupport;ie?.(V,Q),($.litHtmlVersions??=[]).push("3.3.1");const oe=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let se=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const r=n?.renderBefore??t;let i=r._$litPart$;if(void 0===i){const e=n?.renderBefore??null;r._$litPart$=i=new Q(t.insertBefore(k(),e),e,void 0,n??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};se._$litElement$=!0,se.finalized=!0,oe.litElementHydrateSupport?.({LitElement:se});const ae=oe.litElementPolyfillSupport;ae?.({LitElement:se}),(oe.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ce={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},de=(e=ce,t,n)=>{const{kind:r,metadata:i}=n;let o=globalThis.litPropertyMetadata.get(i);if(void 0===o&&globalThis.litPropertyMetadata.set(i,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),"accessor"===r){const{name:r}=n;return{set(n){const i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=n;return function(n){const i=this[r];t.call(this,n),this.requestUpdate(r,i,e)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function he(e){return(t,n)=>"object"==typeof n?de(e,t,n):((e,t,n)=>{const r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return he({...e,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ue=2;class me{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class fe extends me{constructor(e){if(super(e),this.it=j,e.type!==ue)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===j||null==e)return this._t=void 0,this.it=e;if(e===W)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}fe.directiveName="unsafeHTML",fe.resultType=1;const ge=(e=>(...t)=>({_$litDirective$:e,values:t}))(fe),{entries:_e,setPrototypeOf:ve,isFrozen:ye,getPrototypeOf:be,getOwnPropertyDescriptor:Ae}=Object;
/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */let{freeze:we,seal:$e,create:xe}=Object,{apply:Ee,construct:Te}="undefined"!=typeof Reflect&&Reflect;we||(we=function(e){return e}),$e||($e=function(e){return e}),Ee||(Ee=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];return e.apply(t,r)}),Te||(Te=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new e(...n)});const Se=Be(Array.prototype.forEach),Ce=Be(Array.prototype.lastIndexOf),Ne=Be(Array.prototype.pop),De=Be(Array.prototype.push),ke=Be(Array.prototype.splice),Oe=Be(String.prototype.toLowerCase),Re=Be(String.prototype.toString),Me=Be(String.prototype.match),Le=Be(String.prototype.replace),Pe=Be(String.prototype.indexOf),Ie=Be(String.prototype.trim),ze=Be(Object.prototype.hasOwnProperty),Ue=Be(RegExp.prototype.test),Fe=(He=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Te(He,t)});var He;function Be(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return Ee(e,t,r)}}function We(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Oe;ve&&ve(e,null);let r=t.length;for(;r--;){let i=t[r];if("string"==typeof i){const e=n(i);e!==i&&(ye(t)||(t[r]=e),i=e)}e[i]=!0}return e}function je(e){for(let t=0;t<e.length;t++){ze(e,t)||(e[t]=null)}return e}function Ge(e){const t=xe(null);for(const[n,r]of _e(e)){ze(e,n)&&(Array.isArray(r)?t[n]=je(r):r&&"object"==typeof r&&r.constructor===Object?t[n]=Ge(r):t[n]=r)}return t}function Ye(e,t){for(;null!==e;){const n=Ae(e,t);if(n){if(n.get)return Be(n.get);if("function"==typeof n.value)return Be(n.value)}e=be(e)}return function(){return null}}const Ze=we(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),qe=we(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ve=we(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Xe=we(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ke=we(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Qe=we(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Je=we(["#text"]),et=we(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),tt=we(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),nt=we(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),rt=we(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),it=$e(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ot=$e(/<%[\w\W]*|[\w\W]*%>/gm),st=$e(/\$\{[\w\W]*/gm),at=$e(/^data-[\-\w.\u00B7-\uFFFF]+$/),lt=$e(/^aria-[\-\w]+$/),ct=$e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),dt=$e(/^(?:\w+script|data):/i),ht=$e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),pt=$e(/^html$/i),ut=$e(/^[a-z][.\w]*(-[.\w]+)+$/i);var mt=Object.freeze({__proto__:null,ARIA_ATTR:lt,ATTR_WHITESPACE:ht,CUSTOM_ELEMENT:ut,DATA_ATTR:at,DOCTYPE_NAME:pt,ERB_EXPR:ot,IS_ALLOWED_URI:ct,IS_SCRIPT_OR_DATA:dt,MUSTACHE_EXPR:it,TMPLIT_EXPR:st});const ft=1,gt=3,_t=7,vt=8,yt=9,bt=function(){return"undefined"==typeof window?null:window};var At=function e(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:bt();const n=t=>e(t);if(n.version="3.3.1",n.removed=[],!t||!t.document||t.document.nodeType!==yt||!t.Element)return n.isSupported=!1,n;let{document:r}=t;const i=r,o=i.currentScript,{DocumentFragment:s,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:d,NamedNodeMap:h=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:p,DOMParser:u,trustedTypes:m}=t,f=c.prototype,g=Ye(f,"cloneNode"),_=Ye(f,"remove"),v=Ye(f,"nextSibling"),y=Ye(f,"childNodes"),b=Ye(f,"parentNode");if("function"==typeof a){const e=r.createElement("template");e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let A,w="";const{implementation:$,createNodeIterator:x,createDocumentFragment:E,getElementsByTagName:T}=r,{importNode:S}=i;let C={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]};n.isSupported="function"==typeof _e&&"function"==typeof b&&$&&void 0!==$.createHTMLDocument;const{MUSTACHE_EXPR:N,ERB_EXPR:D,TMPLIT_EXPR:k,DATA_ATTR:O,ARIA_ATTR:R,IS_SCRIPT_OR_DATA:M,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:P}=mt;let{IS_ALLOWED_URI:I}=mt,z=null;const U=We({},[...Ze,...qe,...Ve,...Ke,...Je]);let F=null;const H=We({},[...et,...tt,...nt,...rt]);let B=Object.seal(xe(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),W=null,j=null;const G=Object.seal(xe(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Y=!0,Z=!0,q=!1,V=!0,X=!1,K=!0,Q=!1,J=!1,ee=!1,te=!1,ne=!1,re=!1,ie=!0,oe=!1,se=!0,ae=!1,le={},ce=null;const de=We({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let he=null;const pe=We({},["audio","video","img","source","image","track"]);let ue=null;const me=We({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),fe="http://www.w3.org/1998/Math/MathML",ge="http://www.w3.org/2000/svg",ve="http://www.w3.org/1999/xhtml";let ye=ve,be=!1,Ae=null;const $e=We({},[fe,ge,ve],Re);let Ee=We({},["mi","mo","mn","ms","mtext"]),Te=We({},["annotation-xml"]);const He=We({},["title","style","font","a","script"]);let Be=null;const je=["application/xhtml+xml","text/html"];let it=null,ot=null;const st=r.createElement("form"),at=function(e){return e instanceof RegExp||e instanceof Function},lt=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!ot||ot!==e){if(e&&"object"==typeof e||(e={}),e=Ge(e),Be=-1===je.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,it="application/xhtml+xml"===Be?Re:Oe,z=ze(e,"ALLOWED_TAGS")?We({},e.ALLOWED_TAGS,it):U,F=ze(e,"ALLOWED_ATTR")?We({},e.ALLOWED_ATTR,it):H,Ae=ze(e,"ALLOWED_NAMESPACES")?We({},e.ALLOWED_NAMESPACES,Re):$e,ue=ze(e,"ADD_URI_SAFE_ATTR")?We(Ge(me),e.ADD_URI_SAFE_ATTR,it):me,he=ze(e,"ADD_DATA_URI_TAGS")?We(Ge(pe),e.ADD_DATA_URI_TAGS,it):pe,ce=ze(e,"FORBID_CONTENTS")?We({},e.FORBID_CONTENTS,it):de,W=ze(e,"FORBID_TAGS")?We({},e.FORBID_TAGS,it):Ge({}),j=ze(e,"FORBID_ATTR")?We({},e.FORBID_ATTR,it):Ge({}),le=!!ze(e,"USE_PROFILES")&&e.USE_PROFILES,Y=!1!==e.ALLOW_ARIA_ATTR,Z=!1!==e.ALLOW_DATA_ATTR,q=e.ALLOW_UNKNOWN_PROTOCOLS||!1,V=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,X=e.SAFE_FOR_TEMPLATES||!1,K=!1!==e.SAFE_FOR_XML,Q=e.WHOLE_DOCUMENT||!1,te=e.RETURN_DOM||!1,ne=e.RETURN_DOM_FRAGMENT||!1,re=e.RETURN_TRUSTED_TYPE||!1,ee=e.FORCE_BODY||!1,ie=!1!==e.SANITIZE_DOM,oe=e.SANITIZE_NAMED_PROPS||!1,se=!1!==e.KEEP_CONTENT,ae=e.IN_PLACE||!1,I=e.ALLOWED_URI_REGEXP||ct,ye=e.NAMESPACE||ve,Ee=e.MATHML_TEXT_INTEGRATION_POINTS||Ee,Te=e.HTML_INTEGRATION_POINTS||Te,B=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&at(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(B.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&at(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(B.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(B.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),X&&(Z=!1),ne&&(te=!0),le&&(z=We({},Je),F=[],!0===le.html&&(We(z,Ze),We(F,et)),!0===le.svg&&(We(z,qe),We(F,tt),We(F,rt)),!0===le.svgFilters&&(We(z,Ve),We(F,tt),We(F,rt)),!0===le.mathMl&&(We(z,Ke),We(F,nt),We(F,rt))),e.ADD_TAGS&&("function"==typeof e.ADD_TAGS?G.tagCheck=e.ADD_TAGS:(z===U&&(z=Ge(z)),We(z,e.ADD_TAGS,it))),e.ADD_ATTR&&("function"==typeof e.ADD_ATTR?G.attributeCheck=e.ADD_ATTR:(F===H&&(F=Ge(F)),We(F,e.ADD_ATTR,it))),e.ADD_URI_SAFE_ATTR&&We(ue,e.ADD_URI_SAFE_ATTR,it),e.FORBID_CONTENTS&&(ce===de&&(ce=Ge(ce)),We(ce,e.FORBID_CONTENTS,it)),e.ADD_FORBID_CONTENTS&&(ce===de&&(ce=Ge(ce)),We(ce,e.ADD_FORBID_CONTENTS,it)),se&&(z["#text"]=!0),Q&&We(z,["html","head","body"]),z.table&&(We(z,["tbody"]),delete W.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw Fe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw Fe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=e.TRUSTED_TYPES_POLICY,w=A.createHTML("")}else void 0===A&&(A=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const i="dompurify"+(n?"#"+n:"");try{return e.createPolicy(i,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+i+" could not be created."),null}}(m,o)),null!==A&&"string"==typeof w&&(w=A.createHTML(""));we&&we(e),ot=e}},dt=We({},[...qe,...Ve,...Xe]),ht=We({},[...Ke,...Qe]),ut=function(e){De(n.removed,{element:e});try{b(e).removeChild(e)}catch(t){_(e)}},At=function(e,t){try{De(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){De(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e)if(te||ne)try{ut(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},wt=function(e){let t=null,n=null;if(ee)e="<remove></remove>"+e;else{const t=Me(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===Be&&ye===ve&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const i=A?A.createHTML(e):e;if(ye===ve)try{t=(new u).parseFromString(i,Be)}catch(e){}if(!t||!t.documentElement){t=$.createDocument(ye,"template",null);try{t.documentElement.innerHTML=be?w:i}catch(e){}}const o=t.body||t.documentElement;return e&&n&&o.insertBefore(r.createTextNode(n),o.childNodes[0]||null),ye===ve?T.call(t,Q?"html":"body")[0]:Q?t.documentElement:o},$t=function(e){return x.call(e.ownerDocument||e,e,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},xt=function(e){return e instanceof p&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof h)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},Et=function(e){return"function"==typeof l&&e instanceof l};function Tt(e,t,r){Se(e,e=>{e.call(n,t,r,ot)})}const St=function(e){let t=null;if(Tt(C.beforeSanitizeElements,e,null),xt(e))return ut(e),!0;const r=it(e.nodeName);if(Tt(C.uponSanitizeElement,e,{tagName:r,allowedTags:z}),K&&e.hasChildNodes()&&!Et(e.firstElementChild)&&Ue(/<[/\w!]/g,e.innerHTML)&&Ue(/<[/\w!]/g,e.textContent))return ut(e),!0;if(e.nodeType===_t)return ut(e),!0;if(K&&e.nodeType===vt&&Ue(/<[/\w]/g,e.data))return ut(e),!0;if(!(G.tagCheck instanceof Function&&G.tagCheck(r))&&(!z[r]||W[r])){if(!W[r]&&Nt(r)){if(B.tagNameCheck instanceof RegExp&&Ue(B.tagNameCheck,r))return!1;if(B.tagNameCheck instanceof Function&&B.tagNameCheck(r))return!1}if(se&&!ce[r]){const t=b(e)||e.parentNode,n=y(e)||e.childNodes;if(n&&t){for(let r=n.length-1;r>=0;--r){const i=g(n[r],!0);i.__removalCount=(e.__removalCount||0)+1,t.insertBefore(i,v(e))}}}return ut(e),!0}return e instanceof c&&!function(e){let t=b(e);t&&t.tagName||(t={namespaceURI:ye,tagName:"template"});const n=Oe(e.tagName),r=Oe(t.tagName);return!!Ae[e.namespaceURI]&&(e.namespaceURI===ge?t.namespaceURI===ve?"svg"===n:t.namespaceURI===fe?"svg"===n&&("annotation-xml"===r||Ee[r]):Boolean(dt[n]):e.namespaceURI===fe?t.namespaceURI===ve?"math"===n:t.namespaceURI===ge?"math"===n&&Te[r]:Boolean(ht[n]):e.namespaceURI===ve?!(t.namespaceURI===ge&&!Te[r])&&!(t.namespaceURI===fe&&!Ee[r])&&!ht[n]&&(He[n]||!dt[n]):!("application/xhtml+xml"!==Be||!Ae[e.namespaceURI]))}(e)?(ut(e),!0):"noscript"!==r&&"noembed"!==r&&"noframes"!==r||!Ue(/<\/no(script|embed|frames)/i,e.innerHTML)?(X&&e.nodeType===gt&&(t=e.textContent,Se([N,D,k],e=>{t=Le(t,e," ")}),e.textContent!==t&&(De(n.removed,{element:e.cloneNode()}),e.textContent=t)),Tt(C.afterSanitizeElements,e,null),!1):(ut(e),!0)},Ct=function(e,t,n){if(ie&&("id"===t||"name"===t)&&(n in r||n in st))return!1;if(Z&&!j[t]&&Ue(O,t));else if(Y&&Ue(R,t));else if(G.attributeCheck instanceof Function&&G.attributeCheck(t,e));else if(!F[t]||j[t]){if(!(Nt(e)&&(B.tagNameCheck instanceof RegExp&&Ue(B.tagNameCheck,e)||B.tagNameCheck instanceof Function&&B.tagNameCheck(e))&&(B.attributeNameCheck instanceof RegExp&&Ue(B.attributeNameCheck,t)||B.attributeNameCheck instanceof Function&&B.attributeNameCheck(t,e))||"is"===t&&B.allowCustomizedBuiltInElements&&(B.tagNameCheck instanceof RegExp&&Ue(B.tagNameCheck,n)||B.tagNameCheck instanceof Function&&B.tagNameCheck(n))))return!1}else if(ue[t]);else if(Ue(I,Le(n,L,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==Pe(n,"data:")||!he[e]){if(q&&!Ue(M,Le(n,L,"")));else if(n)return!1}else;return!0},Nt=function(e){return"annotation-xml"!==e&&Me(e,P)},Dt=function(e){Tt(C.beforeSanitizeAttributes,e,null);const{attributes:t}=e;if(!t||xt(e))return;const r={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:F,forceKeepAttr:void 0};let i=t.length;for(;i--;){const o=t[i],{name:s,namespaceURI:a,value:l}=o,c=it(s),d=l;let h="value"===s?d:Ie(d);if(r.attrName=c,r.attrValue=h,r.keepAttr=!0,r.forceKeepAttr=void 0,Tt(C.uponSanitizeAttribute,e,r),h=r.attrValue,!oe||"id"!==c&&"name"!==c||(At(s,e),h="user-content-"+h),K&&Ue(/((--!?|])>)|<\/(style|title|textarea)/i,h)){At(s,e);continue}if("attributename"===c&&Me(h,"href")){At(s,e);continue}if(r.forceKeepAttr)continue;if(!r.keepAttr){At(s,e);continue}if(!V&&Ue(/\/>/i,h)){At(s,e);continue}X&&Se([N,D,k],e=>{h=Le(h,e," ")});const p=it(e.nodeName);if(Ct(p,c,h)){if(A&&"object"==typeof m&&"function"==typeof m.getAttributeType)if(a);else switch(m.getAttributeType(p,c)){case"TrustedHTML":h=A.createHTML(h);break;case"TrustedScriptURL":h=A.createScriptURL(h)}if(h!==d)try{a?e.setAttributeNS(a,s,h):e.setAttribute(s,h),xt(e)?ut(e):Ne(n.removed)}catch(t){At(s,e)}}else At(s,e)}Tt(C.afterSanitizeAttributes,e,null)},kt=function e(t){let n=null;const r=$t(t);for(Tt(C.beforeSanitizeShadowDOM,t,null);n=r.nextNode();)Tt(C.uponSanitizeShadowNode,n,null),St(n),Dt(n),n.content instanceof s&&e(n.content);Tt(C.afterSanitizeShadowDOM,t,null)};return n.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=null,o=null,a=null,c=null;if(be=!e,be&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Et(e)){if("function"!=typeof e.toString)throw Fe("toString is not a function");if("string"!=typeof(e=e.toString()))throw Fe("dirty is not a string, aborting")}if(!n.isSupported)return e;if(J||lt(t),n.removed=[],"string"==typeof e&&(ae=!1),ae){if(e.nodeName){const t=it(e.nodeName);if(!z[t]||W[t])throw Fe("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof l)r=wt("\x3c!----\x3e"),o=r.ownerDocument.importNode(e,!0),o.nodeType===ft&&"BODY"===o.nodeName||"HTML"===o.nodeName?r=o:r.appendChild(o);else{if(!te&&!X&&!Q&&-1===e.indexOf("<"))return A&&re?A.createHTML(e):e;if(r=wt(e),!r)return te?null:re?w:""}r&&ee&&ut(r.firstChild);const d=$t(ae?e:r);for(;a=d.nextNode();)St(a),Dt(a),a.content instanceof s&&kt(a.content);if(ae)return e;if(te){if(ne)for(c=E.call(r.ownerDocument);r.firstChild;)c.appendChild(r.firstChild);else c=r;return(F.shadowroot||F.shadowrootmode)&&(c=S.call(i,c,!0)),c}let h=Q?r.outerHTML:r.innerHTML;return Q&&z["!doctype"]&&r.ownerDocument&&r.ownerDocument.doctype&&r.ownerDocument.doctype.name&&Ue(pt,r.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+r.ownerDocument.doctype.name+">\n"+h),X&&Se([N,D,k],e=>{h=Le(h,e," ")}),A&&re?A.createHTML(h):h},n.setConfig=function(){lt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),J=!0},n.clearConfig=function(){ot=null,J=!1},n.isValidAttribute=function(e,t,n){ot||lt({});const r=it(e),i=it(t);return Ct(r,i,n)},n.addHook=function(e,t){"function"==typeof t&&De(C[e],t)},n.removeHook=function(e,t){if(void 0!==t){const n=Ce(C[e],t);return-1===n?void 0:ke(C[e],n,1)[0]}return Ne(C[e])},n.removeHooks=function(e){C[e]=[]},n.removeAllHooks=function(){C={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},n}();const wt=["a","b","br","em","i","li","ol","p","strong","ul"];At.addHook("afterSanitizeAttributes",e=>{"A"===e.tagName&&(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))});const $t=[[["tornado"],"mdi:weather-tornado"],[["thunderstorm","t-storm"],"mdi:weather-lightning"],[["flood","hydrologic"],"mdi:home-flood"],[["snow","blizzard","winter"],"mdi:weather-snowy-heavy"],[["ice","freeze","frost"],"mdi:snowflake"],[["landslide","avalanche"],"mdi:landslide"],[["wind"],"mdi:weather-windy"],[["fire","red flag"],"mdi:fire"],[["heat"],"mdi:weather-sunny-alert"],[["fog"],"mdi:weather-fog"],[["hurricane","tropical"],"mdi:weather-hurricane"]];function xt(e){const t=e.toLowerCase();for(const[e,n]of $t)if(e.some(e=>t.includes(e)))return n;return"mdi:alert-circle-outline"}const Et=[[["likely"],"mdi:check-decagram"],[["observed"],"mdi:eye-check"],[["possible","unlikely"],"mdi:help-circle-outline"]];const Tt=[[["tornado warning"],"#FF0000","255, 0, 0"],[["tornado watch"],"#FFFF00","255, 255, 0"],[["extreme wind warning"],"#FF8C00","255, 140, 0"],[["hurricane warning"],"#DC143C","220, 20, 60"],[["excessive heat warning"],"#C71585","199, 21, 133"],[["flash flood warning","flash flood stmt"],"#8B0000","139, 0, 0"],[["flash flood watch"],"#2E8B57","46, 139, 87"],[["flash flood advisory"],"#00FF7F","0, 255, 127"],[["severe thunderstorm warning"],"#FFA500","255, 165, 0"],[["severe thunderstorm watch"],"#DB7093","219, 112, 147"],[["blizzard warning"],"#FF4500","255, 69, 0"],[["ice storm warning"],"#8B008B","139, 0, 139"],[["winter storm warning"],"#FF69B4","255, 105, 180"],[["winter storm watch"],"#4682B4","70, 130, 180"],[["high wind warning"],"#DAA520","218, 165, 32"],[["wind chill warning"],"#B0C4DE","176, 196, 222"],[["red flag warning","fire weather watch"],"#FF4500","255, 69, 0"],[["tsunami warning"],"#FD6347","253, 99, 71"],[["heat advisory"],"#FF7F50","255, 127, 80"],[["dense fog advisory"],"#708090","112, 128, 144"],[["frost advisory"],"#6495ED","100, 149, 237"],[["freeze warning"],"#483D8B","72, 61, 139"],[["wind advisory"],"#D2B48C","210, 180, 140"],[["winter weather advisory"],"#7B68EE","123, 104, 238"],[["tornado"],"#FF0000","255, 0, 0"],[["hurricane","typhoon","tropical storm"],"#DC143C","220, 20, 60"],[["flood"],"#228B22","34, 139, 34"],[["blizzard","ice storm"],"#FF4500","255, 69, 0"],[["snow","winter","blizzard"],"#1E90FF","30, 144, 255"],[["freeze","frost","ice"],"#6495ED","100, 149, 237"],[["wind"],"#D2B48C","210, 180, 140"],[["heat"],"#FF7F50","255, 127, 80"],[["fire","red flag"],"#FF4500","255, 69, 0"],[["fog"],"#708090","112, 128, 144"],[["tsunami"],"#FD6347","253, 99, 71"]];function St(e){if(!e||"None"===e||""===e.trim())return 0;const t=new Date(e.trim());return isNaN(t.getTime())?0:t.getTime()/1e3}function Ct(e,t){if(!t?.timeZone)return"";const n=new Intl.DateTimeFormat(t.language,{timeZoneName:"short",timeZone:t.timeZone}).formatToParts(e);return n.find(e=>"timeZoneName"===e.type)?.value??""}function Nt(e,t){const n=t?.language,r=t?.date_format,i=t?.timeZone;if(!r||"language"===r)return e.toLocaleDateString(n,{timeZone:i});const o=new Intl.DateTimeFormat(n,{day:"numeric",month:"numeric",year:"numeric",timeZone:i}).formatToParts(e),s=o.find(e=>"day"===e.type)?.value??"",a=o.find(e=>"month"===e.type)?.value??"",l=o.find(e=>"year"===e.type)?.value??"";switch(r){case"DMY":return`${s}/${a}/${l}`;case"MDY":return`${a}/${s}/${l}`;case"YMD":return`${l}/${a}/${s}`;default:return e.toLocaleDateString(n,{timeZone:i})}}function Dt(e,t,n){const r=function(e){if(!e)return{locale:void 0};const t=e.language;return"12"===e.time_format?{locale:t,hour12:!0}:"24"===e.time_format?{locale:t,hour12:!1}:{locale:t}}(t),i={hour:n,minute:"2-digit",timeZone:t?.timeZone};return void 0!==r.hour12&&(i.hour12=r.hour12),e.toLocaleTimeString(r.locale,i)}function kt(e,t){if(e<=0)return"N/A";const n=new Date(1e3*e),r=new Date,i=Ct(n,t),o=Dt(n,t,"2-digit"),s=i?`${o} ${i}`:o;return function(e,t,n){const r=new Intl.DateTimeFormat("en-CA",{year:"numeric",month:"2-digit",day:"2-digit",timeZone:n});return r.format(e)===r.format(t)}(n,r,t?.timeZone)?s:`${s} (${Nt(n,t)})`}function Ot(e,t){if(e<=100)return"N/A";const n=new Date(1e3*e),r=Ct(n,t),i=Dt(n,t,"numeric"),o=r?`${i} ${r}`:i;return`${Nt(n,t)}, ${o}`}function Rt(e,t=Date.now()/1e3){const n=e-t,r=Math.abs(n),i=n<0;if(r<60)return i?"just now":"in <1m";if(r<3600){const e=Math.round(r/60);return i?`${e}m ago`:`in ${e}m`}if(r<86400){const e=Math.floor(r/3600),t=Math.round(r%3600/60),n=t>0?`${e}h ${t}m`:`${e}h`;return i?`${n} ago`:`in ${n}`}const o=Math.round(r/86400);return i?`${o}d ago`:`in ${o}d`}function Mt(e){const t=(e||"").toLowerCase().replace(/\s/g,"");return["extreme","severe","moderate","minor"].includes(t)?t:"unknown"}const Lt={extreme:0,severe:1,moderate:2,minor:3,unknown:4};function Pt(e){if(!e.Onset||"None"===e.Onset||""===e.Onset.trim())return 1/0;const t=new Date(e.Onset.trim());return isNaN(t.getTime())?1/0:t.getTime()}function It(e){const t=e.split("/");return t[t.length-1].toUpperCase()}const zt=s`
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
  .meta-relative {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    font-style: italic;
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
`;let Ut=class extends se{setConfig(e){this._config=e}_fireConfigChanged(e){this._config=e;const t=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(t)}_entityChanged(e){const t=e.detail.value;t!==this._config.entity&&this._fireConfigChanged({...this._config,entity:t})}_titleChanged(e){const t=e.target.value;if(t===(this._config.title||""))return;const n={...this._config};t?n.title=t:delete n.title,this._fireConfigChanged(n)}_animationsChanged(e){const t=e.target.checked;if(t===(!1!==this._config.animations))return;const n={...this._config};t?delete n.animations:n.animations=!1,this._fireConfigChanged(n)}_layoutChanged(e){const t=e.target.checked;if(t===("compact"===this._config.layout))return;const n={...this._config};t?n.layout="compact":delete n.layout,this._fireConfigChanged(n)}_zonesChanged(e){const t=e.target.value,n={...this._config};t.trim()?n.zones=t.split(",").map(e=>e.trim()).filter(Boolean):delete n.zones,this._fireConfigChanged(n)}_sortOrderChanged(e){const t=e.target.value;if(t===(this._config.sortOrder||"default"))return;const n={...this._config};"default"===t?delete n.sortOrder:n.sortOrder=t,this._fireConfigChanged(n)}_colorThemeChanged(e){const t=e.target.value;if(t===(this._config.colorTheme||"severity"))return;const n={...this._config};"severity"===t?delete n.colorTheme:n.colorTheme=t,this._fireConfigChanged(n)}render(){if(!this.hass||!this._config)return B``;const e=this._config.zones?this._config.zones.join(", "):"";return B`
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
          .value=${e}
          .helper=${"Comma-separated zone codes, e.g. COC059, COZ039"}
          .helperPersistent=${!0}
          @change=${this._zonesChanged}
        ></ha-textfield>

        <ha-select
          .label=${"Sort order"}
          .value=${this._config.sortOrder||"default"}
          @selected=${this._sortOrderChanged}
          @closed=${e=>e.stopPropagation()}
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
          @closed=${e=>e.stopPropagation()}
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
    `}};Ut.styles=s`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }
  `,e([he({attribute:!1})],Ut.prototype,"hass",void 0),e([pe()],Ut.prototype,"_config",void 0),Ut=e([le("nws-alerts-card-editor")],Ut);let Ft=class extends se{constructor(){super(...arguments),this._expandedAlerts=new Map,this._motionQuery=window.matchMedia("(prefers-reduced-motion: reduce)"),this._onMotionChange=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),this._motionQuery.addEventListener("change",this._onMotionChange)}disconnectedCallback(){super.disconnectedCallback(),this._motionQuery.removeEventListener("change",this._onMotionChange)}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");this._config=e}getCardSize(){const e=this._getAlerts(),t=this._isCompact?1:3;return Math.max(1,e.length*t)}static getConfigElement(){return document.createElement("nws-alerts-card-editor")}static getStubConfig(){return{entity:"sensor.nws_alerts_alerts"}}_getAlerts(){if(!this.hass||!this._config)return[];const e=this.hass.states[this._config.entity];if(!e)return[];const t=e.attributes.Alerts||[];let n=t;if(this._config.zones&&this._config.zones.length>0){const e=new Set(this._config.zones.map(e=>e.toUpperCase()));n=t.filter(t=>function(e,t){if(e.AffectedZones)for(const n of e.AffectedZones)if(t.has(It(n)))return!0;if(e.Geocode?.UGC)for(const n of e.Geocode.UGC)if(t.has(n.toUpperCase()))return!0;return!1}(t,e))}return function(e,t){return"onset"===t?[...e].sort((e,t)=>Pt(e)-Pt(t)):"severity"===t?[...e].sort((e,t)=>{const n=(Lt[Mt(e.Severity)]??4)-(Lt[Mt(t.Severity)]??4);return 0!==n?n:Pt(e)-Pt(t)}):e}(n,this._config.sortOrder||"default")}get _locale(){return{...this.hass.locale,timeZone:this.hass.config?.time_zone}}get _animationsEnabled(){return!0===this._config?.animations||!1!==this._config?.animations&&!this._motionQuery.matches}get _isCompact(){return"compact"===this._config?.layout}get _colorTheme(){return this._config?.colorTheme||"severity"}_alertColorStyle(e){if("nws"!==this._colorTheme)return"";const{color:t,rgb:n}=function(e){const t=e.toLowerCase();for(const[e,n,r]of Tt)if(e.some(e=>t.includes(e)))return{color:n,rgb:r};return{color:"#808080",rgb:"128, 128, 128"}}(e);return`--color: ${t}; --color-rgb: ${n};`}_normalizeText(e){return(e||"").replace(/\n{2,}/g,"\n\n").trim()}_toggleDetails(e){const t=new Map(this._expandedAlerts);t.set(e,!t.get(e)),this._expandedAlerts=t}render(){if(!this._config||!this.hass)return B``;const e=this.hass.states[this._config.entity];if(!e)return B`
        <ha-card .header=${this._config.title||""}>
          <div class="error">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;const t=e.state;if("unavailable"===t||"unknown"===t)return B`
        <ha-card .header=${this._config.title||""}>
          <div class="sensor-unavailable">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            NWS Alerts sensor is ${t}.
          </div>
        </ha-card>
      `;const n=this._getAlerts(),r=this._animationsEnabled?"":"no-animations",i=this._isCompact?"compact":"";return B`
      <ha-card .header=${this._config.title||""} class="${r} ${i}">
        ${0===n.length?this._renderNoAlerts():n.map(e=>this._renderAlert(e))}
      </ha-card>
    `}_renderNoAlerts(){return B`
      <div class="no-alerts">
        <ha-icon icon="mdi:weather-sunny"></ha-icon><br>
        No active NWS alerts.
      </div>
    `}_renderAlert(e){const t=`severity-${Mt(e.Severity)}`,n=function(e){const t=Date.now()/1e3,n=St(e.Sent),r=n>0?n:t;let i=St(e.Onset);0===i&&(i=r);const o=i+3600;let s=St(e.Ends||e.Expires||"");0===s&&(s=o);const a=!(!e.Ends&&!e.Expires),l=t>=i;let c,d,h,p;l?(c=i,d=s,h=t,p="Active"):(c=t,d=s,h=i,p="Preparation");const u=d-c,m=(h-c)/(u>0?u:1)*100;return{isActive:l,phaseText:p,progressPct:Math.max(0,Math.min(100,Math.round(10*m)/10)),remainingHours:Math.round((s-t)/3600*10)/10,onsetHours:Math.round((i-t)/3600*10)/10,onsetMinutes:Math.round((i-t)/60),onsetTs:i,endsTs:s,sentTs:n,nowTs:t,hasEndTime:a}}(e),r=n.phaseText.toLowerCase(),i=this._expandedAlerts.get(e.ID)||!1;return this._isCompact?this._renderCompactAlert(e,t,r,n,i):this._renderFullAlert(e,t,r,n,i)}_renderCompactAlert(e,t,n,r,i){return B`
      <div class="alert-card ${t} ${n}" style=${this._alertColorStyle(e.Event)}>
        <div
          class="alert-header-row compact-row"
          @click=${()=>this._toggleDetails(e.ID)}
        >
          <div class="icon-box">
            <ha-icon icon=${xt(e.Event)}></ha-icon>
          </div>
          <span class="alert-title">${e.Event||"Unknown"}</span>
          <ha-icon
            icon="mdi:chevron-down"
            class="compact-chevron ${i?"expanded":""}"
          ></ha-icon>
        </div>
        ${i?this._renderExpandedContent(e,r):j}
      </div>
    `}_renderExpandedContent(e,t){return this._normalizeText(e.Description),this._normalizeText(e.Instruction),B`
      <div class="alert-expanded">
        <div class="badges-row" style="padding: 0 12px 8px;">
          ${this._renderBadgesRow(e,t)}
        </div>

        ${this._renderProgressSection(e,t)}

        <div class="alert-details-section">
          <div
            class="details-summary"
            @click=${()=>this._toggleDetails(e.ID+"_details")}
          >
            <span>Read Details</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${this._expandedAlerts.get(e.ID+"_details")?"expanded":""}"
            ></ha-icon>
          </div>
          ${this._expandedAlerts.get(e.ID+"_details")?this._renderDetailsContent(e,t):j}
        </div>
      </div>
    `}_renderFullAlert(e,t,n,r,i){return B`
      <div class="alert-card ${t} ${n}" style=${this._alertColorStyle(e.Event)}>
        <div class="alert-header-row">
          <div class="icon-box">
            <ha-icon icon=${xt(e.Event)}></ha-icon>
          </div>
          <div class="info-box">
            <div class="title-row">
              <span class="alert-title">${e.Event||"Unknown"}</span>
            </div>
            <div class="badges-row">
              ${this._renderBadgesRow(e,r)}
            </div>
          </div>
        </div>

        ${this._renderProgressSection(e,r)}

        <div class="alert-details-section">
          <div
            class="details-summary"
            @click=${()=>this._toggleDetails(e.ID)}
          >
            <span>Read Details</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${i?"expanded":""}"
            ></ha-icon>
          </div>
          ${i?this._renderDetailsContent(e,r):j}
        </div>
      </div>
    `}_renderBadgesRow(e,t){return B`
      <span class="badge severity-badge">${e.Severity}</span>
      <span class="badge certainty-badge">
        <ha-icon
          icon=${function(e){const t=e.toLowerCase();for(const[e,n]of Et)if(e.some(e=>t.includes(e)))return n;return"mdi:bullseye-arrow"}(e.Certainty)}
          style="--mdc-icon-size: 14px; width: 14px; height: 14px;"
        ></ha-icon>
        ${e.Certainty}
      </span>
      ${t.isActive?B`<span class="badge active-badge">Active</span>`:B`<span class="badge prep-badge">In Prep</span>`}
    `}_renderTextBlock(e,t){return t?B`
      <div class="text-block">
        <div class="text-label">${e}</div>
        <div class="text-body">${ge(function(e){return e?At.sanitize(e,{ALLOWED_TAGS:wt,ALLOWED_ATTR:["href"]}):""}(t))}</div>
      </div>
    `:j}_renderDetailsContent(e,t){const n=this._normalizeText(e.Description),r=this._normalizeText(e.Instruction);return B`
      <div class="details-content">
        <div class="meta-grid">
          <div class="meta-item">
            <span class="meta-label">Issued</span>
            <span class="meta-value">${Ot(t.sentTs,this._locale)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Onset</span>
            <span class="meta-value">${Ot(t.onsetTs,this._locale)}</span>
            <span class="meta-relative">${Rt(t.onsetTs,t.nowTs)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Expires</span>
            <span class="meta-value">${Ot(t.endsTs,this._locale)}</span>
            ${t.hasEndTime?B`<span class="meta-relative">${Rt(t.endsTs,t.nowTs)}</span>`:j}
          </div>
        </div>

        ${this._renderTextBlock("Description",n)}
        ${this._renderTextBlock("Instructions",r)}

        <div class="footer-link">
          <a href=${e.URL||"#"} target="_blank" rel="noopener noreferrer">
            Open NWS Source
            <ha-icon icon="mdi:open-in-new" style="width:14px;"></ha-icon>
          </a>
        </div>
      </div>
    `}_renderProgressSection(e,t){const{isActive:n,progressPct:r,hasEndTime:i,onsetTs:o,endsTs:s,nowTs:a}=t,l=!this._animationsEnabled,c=n&&!i?l?"width: 100%; left: 0; opacity: 0.8;":"width: 100%; left: 0; animation: ongoing-pulse 5s infinite; opacity: 0.8;":`width: ${100-r}%; left: ${r}%;`;return B`
      <div class="progress-section">
        <div class="progress-labels">
          <div class="label-left">
            <span class="label-sub">${n?"Start":"Now"}</span><br>
            ${kt(n?o:a,this._locale)}
          </div>
          <div class="label-center">
            ${i?n?B`expires <b>${Rt(s,a)}</b>`:B`starts <b>${Rt(o,a)}</b>`:B`<span style="color: var(--color);"><b>Ongoing</b></span>`}
          </div>
          <div class="label-right">
            <span class="label-sub">End</span><br>
            ${i?kt(s,this._locale):"TBD"}
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style=${c}></div>
        </div>
      </div>
    `}};Ft.styles=zt,e([he({attribute:!1})],Ft.prototype,"hass",void 0),e([pe()],Ft.prototype,"_config",void 0),e([pe()],Ft.prototype,"_expandedAlerts",void 0),Ft=e([le("nws-alerts-card")],Ft);const Ht=window;Ht.customCards=Ht.customCards||[],Ht.customCards.push({type:"nws-alerts-card",name:"NWS Alerts Card",description:"A card for displaying NWS weather alerts with severity indicators, progress bars, and expandable details."});export{Ft as NwsAlertsCard};
