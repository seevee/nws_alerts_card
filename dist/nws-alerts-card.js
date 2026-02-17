function t(t,e,s,i){var r,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,s,n):r(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,$=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s){if(void 0!==t){const i=this.constructor,r=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??b)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=A.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,k=`<${P}>`,T=document,M=()=>T.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,N="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,V=T.createTreeWalker(T,129);function Y(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=D;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,d=0;for(;d<s.length&&(n.lastIndex=d,l=n.exec(s),null!==l);)d=n.lastIndex,n===D?"!--"===l[1]?n=R:void 0!==l[1]?n=z:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=H):void 0!==l[3]&&(n=H):n===H?">"===l[0]?(n=r??D,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?H:'"'===l[3]?I:L):n===I||n===L?n=H:n===R||n===z?n=D:(n=H,r=void 0);const h=n===H&&t[e+1].startsWith("/>")?" ":"";o+=n===D?s+k:c>=0?(i.push(a),s.slice(0,c)+S+s.slice(c)+C+h):s+C+(-2===c?e:h)}return[Y(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class F{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,c]=Z(t,e);if(this.el=F.createElement(l,s),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=V.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[o++],s=i.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?st:X}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),V.nextNode(),a.push({type:2,index:++r});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=T.createElement("template");return s.innerHTML=t,s}}function J(t,e,s=t,i){if(e===W)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=O(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,i)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);V.currentNode=i;let r=V.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(r=V.nextNode(),o++)}return V.currentNode=T,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=F.createElement(Y(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new K(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new F(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Q(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=J(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=J(this,i[s+n],e,n),a===W&&(a=this._$AH[n]),o||=!O(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends X{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(F,Q),(A.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Q(e.insertBefore(M(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:b},dt=(t=ct,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ht(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ht({...t,state:!0,attribute:!1})}function ut(t){if(!t||"None"===t||""===t.trim())return 0;const e=new Date(t.trim());return isNaN(e.getTime())?0:e.getTime()/1e3}function gt(t){if(!t)return{locale:void 0};const e=t.language;return"12"===t.time_format?{locale:e,hour12:!0}:"24"===t.time_format?{locale:e,hour12:!1}:{locale:e}}function ft(t,e){const s=e?.language,i=e?.date_format;if(!i||"language"===i)return t.toLocaleDateString(s);const r=new Intl.DateTimeFormat(s,{day:"numeric",month:"numeric",year:"numeric"}).formatToParts(t),o=r.find(t=>"day"===t.type)?.value??"",n=r.find(t=>"month"===t.type)?.value??"",a=r.find(t=>"year"===t.type)?.value??"";switch(i){case"DMY":return`${o}/${n}/${a}`;case"MDY":return`${n}/${o}/${a}`;case"YMD":return`${a}/${n}/${o}`;default:return t.toLocaleDateString(s)}}function mt(t,e){if(t<=0)return"N/A";const s=new Date(1e3*t),i=new Date,r=gt(e),o={hour:"2-digit",minute:"2-digit"};void 0!==r.hour12&&(o.hour12=r.hour12);const n=s.toLocaleTimeString(r.locale,o);return s.getFullYear()===i.getFullYear()&&s.getMonth()===i.getMonth()&&s.getDate()===i.getDate()?n:`${n} (${ft(s,e)})`}function vt(t,e){if(t<=100)return"N/A";const s=new Date(1e3*t),i=gt(e),r={hour:"numeric",minute:"2-digit"};void 0!==i.hour12&&(r.hour12=i.hour12);const o=s.toLocaleTimeString(i.locale,r);return`${ft(s,e)}, ${o}`}function $t(t){const e=t.split("/");return e[e.length-1].toUpperCase()}const _t=n`
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

  /* --- COLOR MAPPING --- */
  .severity-extreme { --color: var(--error-color); --color-rgb: 244, 67, 54; }
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
`;let bt=class extends nt{setConfig(t){this._config=t}_fireConfigChanged(t){this._config=t;const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_entityChanged(t){const e=t.detail.value;e!==this._config.entity&&this._fireConfigChanged({...this._config,entity:e})}_titleChanged(t){const e=t.target.value;if(e===(this._config.title||""))return;const s={...this._config};e?s.title=e:delete s.title,this._fireConfigChanged(s)}_animationsChanged(t){const e=t.target.checked;if(e===(!1!==this._config.animations))return;const s={...this._config};e?delete s.animations:s.animations=!1,this._fireConfigChanged(s)}_zonesChanged(t){const e=t.target.value,s={...this._config};e.trim()?s.zones=e.split(",").map(t=>t.trim()).filter(Boolean):delete s.zones,this._fireConfigChanged(s)}render(){if(!this.hass||!this._config)return B``;const t=this._config.zones?this._config.zones.join(", "):"";return B`
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

        <ha-formfield .label=${"Enable animations"}>
          <ha-switch
            .checked=${!1!==this._config.animations}
            @change=${this._animationsChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `}};bt.styles=n`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }
  `,t([ht({attribute:!1})],bt.prototype,"hass",void 0),t([pt()],bt.prototype,"_config",void 0),bt=t([lt("nws-alerts-card-editor")],bt);let yt=class extends nt{constructor(){super(...arguments),this._expandedAlerts=new Map}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this._config=t}getCardSize(){const t=this._getAlerts();return Math.max(1,3*t.length)}static getConfigElement(){return document.createElement("nws-alerts-card-editor")}static getStubConfig(){return{entity:"sensor.nws_alerts_alerts"}}_getAlerts(){if(!this.hass||!this._config)return[];const t=this.hass.states[this._config.entity];if(!t)return[];const e=t.attributes.Alerts||[];if(this._config.zones&&this._config.zones.length>0){const t=new Set(this._config.zones.map(t=>t.toUpperCase()));return e.filter(e=>function(t,e){if(t.AffectedZones)for(const s of t.AffectedZones)if(e.has($t(s)))return!0;if(t.Geocode?.UGC)for(const s of t.Geocode.UGC)if(e.has(s.toUpperCase()))return!0;return!1}(e,t))}return e}_toggleDetails(t){const e=new Map(this._expandedAlerts);e.set(t,!e.get(t)),this._expandedAlerts=e}render(){if(!this._config||!this.hass)return B``;if(!this.hass.states[this._config.entity])return B`
        <ha-card .header=${this._config.title||""}>
          <div class="error">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;const t=this._getAlerts(),e=!1===this._config.animations?"no-animations":"";return B`
      <ha-card .header=${this._config.title||""} class=${e}>
        ${0===t.length?this._renderNoAlerts():t.map(t=>this._renderAlert(t))}
      </ha-card>
    `}_renderNoAlerts(){return B`
      <div class="no-alerts">
        <ha-icon icon="mdi:weather-sunny"></ha-icon><br>
        No active NWS alerts.
      </div>
    `}_renderAlert(t){const e=function(t){const e=(t||"").toLowerCase().replace(/\s/g,"");return["extreme","severe","moderate","minor"].includes(e)?e:"unknown"}(t.Severity),s=`severity-${e}`,i=function(t){const e=Date.now()/1e3,s=ut(t.Sent),i=s>0?s:e;let r=ut(t.Onset);0===r&&(r=i);const o=r+3600;let n=ut(t.Ends||t.Expires||"");0===n&&(n=o);const a=!(!t.Ends&&!t.Expires),l=e>=r;let c,d,h,p;l?(c=r,d=n,h=e,p="Active"):(c=e,d=n,h=r,p="Preparation");const u=d-c,g=(h-c)/(u>0?u:1)*100;return{isActive:l,phaseText:p,progressPct:Math.max(0,Math.min(100,Math.round(10*g)/10)),remainingHours:Math.round((n-e)/3600*10)/10,onsetHours:Math.round((r-e)/3600*10)/10,onsetMinutes:Math.round((r-e)/60),onsetTs:r,endsTs:n,sentTs:s,nowTs:e,hasEndTime:a}}(t),r=i.phaseText.toLowerCase(),o=this._expandedAlerts.get(t.ID)||!1,n=(t.Description||"").replace(/\n{2,}/g,"\n\n").trim(),a=(t.Instruction||"").replace(/\n{2,}/g,"\n\n").trim();return B`
      <div class="alert-card ${s} ${r}">
        <div class="alert-header-row">
          <div class="icon-box">
            <ha-icon icon=${function(t){const e=t.toLowerCase();return e.includes("tornado")?"mdi:weather-tornado":e.includes("thunderstorm")||e.includes("t-storm")?"mdi:weather-lightning":e.includes("flood")||e.includes("hydrologic")?"mdi:home-flood":e.includes("snow")||e.includes("blizzard")||e.includes("winter")?"mdi:weather-snowy-heavy":e.includes("ice")||e.includes("freeze")||e.includes("frost")?"mdi:snowflake":e.includes("landslide")||e.includes("avalanche")?"mdi:landslide":e.includes("wind")?"mdi:weather-windy":e.includes("fire")||e.includes("red flag")?"mdi:fire":e.includes("heat")?"mdi:weather-sunny-alert":e.includes("fog")?"mdi:weather-fog":e.includes("hurricane")||e.includes("tropical")?"mdi:weather-hurricane":"mdi:alert-circle-outline"}(t.Event)}></ha-icon>
          </div>
          <div class="info-box">
            <div class="title-row">
              <span class="alert-title">${t.Event||"Unknown"}</span>
            </div>
            <div class="badges-row">
              <span class="badge severity-badge">${t.Severity}</span>
              <span class="badge certainty-badge">
                <ha-icon
                  icon=${function(t){const e=t.toLowerCase();return e.includes("likely")?"mdi:check-decagram":e.includes("observed")?"mdi:eye-check":e.includes("possible")||e.includes("unlikely")?"mdi:help-circle-outline":"mdi:bullseye-arrow"}(t.Certainty)}
                  style="--mdc-icon-size: 14px; width: 14px; height: 14px;"
                ></ha-icon>
                ${t.Certainty}
              </span>
              ${i.isActive?B`<span class="badge active-badge">Active</span>`:B`<span class="badge prep-badge">In Prep</span>`}
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
              class="chevron ${o?"expanded":""}"
            ></ha-icon>
          </div>
          ${o?B`
                <div class="details-content">
                  <div class="meta-grid">
                    <div class="meta-item">
                      <span class="meta-label">Issued</span>
                      <span class="meta-value">${vt(i.sentTs,this.hass.locale)}</span>
                    </div>
                    <div class="meta-item">
                      <span class="meta-label">Onset</span>
                      <span class="meta-value">${vt(i.onsetTs,this.hass.locale)}</span>
                    </div>
                    <div class="meta-item">
                      <span class="meta-label">Expires</span>
                      <span class="meta-value">${vt(i.endsTs,this.hass.locale)}</span>
                    </div>
                  </div>

                  ${n?B`
                        <div class="text-block">
                          <div class="text-label">Description</div>
                          <div class="text-body">${n}</div>
                        </div>
                      `:q}

                  ${a?B`
                        <div class="text-block">
                          <div class="text-label">Instructions</div>
                          <div class="text-body">${a}</div>
                        </div>
                      `:q}

                  <div class="footer-link">
                    <a href=${t.URL||"#"} target="_blank">
                      Open NWS Source
                      <ha-icon icon="mdi:open-in-new" style="width:14px;"></ha-icon>
                    </a>
                  </div>
                </div>
              `:q}
        </div>
      </div>
    `}_renderProgressSection(t,e){const{isActive:s,progressPct:i,hasEndTime:r,onsetMinutes:o,onsetHours:n,onsetTs:a,endsTs:l,nowTs:c}=e,d=!1===this._config.animations,h=s&&!r?d?"width: 100%; left: 0; opacity: 0.8;":"width: 100%; left: 0; animation: ongoing-pulse 5s infinite; opacity: 0.8;":`width: ${100-i}%; left: ${i}%;`;return B`
      <div class="progress-section">
        <div class="progress-labels">
          <div class="label-left">
            <span class="label-sub">${s?"Start":"Now"}</span><br>
            ${mt(s?a:c,this.hass.locale)}
          </div>
          <div class="label-center">
            ${r?s?B`${Math.round(i)}% Elapsed`:B`starts in <b>${o<60?o:n}</b> ${o<60?"min":"hrs"}`:B`<span style="color: var(--color);"><b>Ongoing</b></span>`}
          </div>
          <div class="label-right">
            <span class="label-sub">End</span><br>
            ${r?mt(l,this.hass.locale):"TBD"}
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style=${h}></div>
        </div>
      </div>
    `}};yt.styles=_t,t([ht({attribute:!1})],yt.prototype,"hass",void 0),t([pt()],yt.prototype,"_config",void 0),t([pt()],yt.prototype,"_expandedAlerts",void 0),yt=t([lt("nws-alerts-card")],yt);const xt=window;xt.customCards=xt.customCards||[],xt.customCards.push({type:"nws-alerts-card",name:"NWS Alerts Card",description:"A card for displaying NWS weather alerts with severity indicators, progress bars, and expandable details."});export{yt as NwsAlertsCard};
