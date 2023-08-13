import{h as I,o as U,c as A,a0 as C,a1 as D,k as f,l as $,t as R,J as V,a as F}from"./chunks/framework.c65bfd77.js";import{_ as G}from"./chunks/default.vue_vue_type_style_index_0_lang.292287bb.js";import"./chunks/scrollbarTemplate.vue_vue_type_script_setup_true_lang.958cf48e.js";var J=typeof global=="object"&&global&&global.Object===Object&&global;const X=J;var q=typeof self=="object"&&self&&self.Object===Object&&self,z=X||q||Function("return this")();const N=z;var K=N.Symbol;const v=K;var P=Object.prototype,Q=P.hasOwnProperty,Y=P.toString,p=v?v.toStringTag:void 0;function Z(e){var n=Q.call(e,p),r=e[p];try{e[p]=void 0;var i=!0}catch{}var l=Y.call(e);return i&&(n?e[p]=r:delete e[p]),l}var ee=Object.prototype,ne=ee.toString;function te(e){return ne.call(e)}var re="[object Null]",oe="[object Undefined]",k=v?v.toStringTag:void 0;function ie(e){return e==null?e===void 0?oe:re:k&&k in Object(e)?Z(e):te(e)}function ae(e){return e!=null&&typeof e=="object"}var se="[object Symbol]";function le(e){return typeof e=="symbol"||ae(e)&&ie(e)==se}var ce=/\s/;function fe(e){for(var n=e.length;n--&&ce.test(e.charAt(n)););return n}var ue=/^\s+/;function de(e){return e&&e.slice(0,fe(e)+1).replace(ue,"")}function x(e){var n=typeof e;return e!=null&&(n=="object"||n=="function")}var H=0/0,me=/^[-+]0x[0-9a-f]+$/i,be=/^0b[01]+$/i,pe=/^0o[0-7]+$/i,he=parseInt;function E(e){if(typeof e=="number")return e;if(le(e))return H;if(x(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=x(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=de(e);var r=be.test(e);return r||pe.test(e)?he(e.slice(2),r?2:8):me.test(e)?H:+e}var ve=function(){return N.Date.now()};const O=ve;var ge="Expected a function",Te=Math.max,ye=Math.min;function Oe(e,n,r){var i,l,a,s,o,u,d=0,S=!1,m=!1,g=!0;if(typeof e!="function")throw new TypeError(ge);n=E(n)||0,x(r)&&(S=!!r.leading,m="maxWait"in r,a=m?Te(E(r.maxWait)||0,n):a,g="trailing"in r?!!r.trailing:g);function T(t){var c=i,b=l;return i=l=void 0,d=t,s=e.apply(b,c),s}function B(t){return d=t,o=setTimeout(h,n),S?T(t):s}function W(t){var c=t-u,b=t-d,w=n-c;return m?ye(w,a-b):w}function _(t){var c=t-u,b=t-d;return u===void 0||c>=n||c<0||m&&b>=a}function h(){var t=O();if(_(t))return j(t);o=setTimeout(h,W(t))}function j(t){return o=void 0,g&&i?T(t):(i=l=void 0,s)}function L(){o!==void 0&&clearTimeout(o),d=0,i=u=l=o=void 0}function M(){return o===void 0?s:j(O())}function y(){var t=O(),c=_(t);if(i=arguments,l=this,u=t,c){if(o===void 0)return B(u);if(m)return clearTimeout(o),o=setTimeout(h,n),T(u)}return o===void 0&&(o=setTimeout(h,n)),s}return y.cancel=L,y.flush=M,y}const xe=f("h1",{id:"showonhover-example",tabindex:"-1"},[F("ShowOnHover example "),f("a",{class:"header-anchor",href:"#showonhover-example","aria-label":'Permalink to "ShowOnHover example"'},"​")],-1),Se=f("p",null,"Scrollbar can be visible only on hover, please hover onto list to show scrollbars",-1),_e=f("hr",null,null,-1),je=f("br",null,null,-1),we=f("hr",null,null,-1),Ee=JSON.parse('{"title":"ShowOnHover example","description":"","frontmatter":{},"headers":[],"relativePath":"examples/showOnHover.md","filePath":"examples/showOnHover.md","lastUpdated":1691967147000}'),Ie={name:"examples/showOnHover.md"},Ne=Object.assign(Ie,{setup(e){const n=I(300),r=I(n.value),i=Oe(l=>{r.value=n.value},200);return(l,a)=>(U(),A("div",null,[xe,Se,_e,C(f("input",{type:"range",id:"showOnHoverTransition",min:"0",max:"1500","onUpdate:modelValue":a[0]||(a[0]=s=>n.value=s),onInput:a[1]||(a[1]=(...s)=>$(i)&&$(i)(...s))},null,544),[[D,n.value]]),je,f("div",null,"Transition duration "+R(n.value)+"ms",1),we,V(G,{"show-on-hover":parseInt(r.value)},null,8,["show-on-hover"])]))}});export{Ee as __pageData,Ne as default};
