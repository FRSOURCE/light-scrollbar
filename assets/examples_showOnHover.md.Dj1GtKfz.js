import{j as I,c as U,a2 as A,a3 as C,l as f,m as k,t as D,I as R,a as V,o as F}from"./chunks/framework.B9Uhwp_2.js";import{_ as G}from"./chunks/default.vue_vue_type_style_index_0_lang.DSJbh1wJ.js";import"./chunks/scrollbarTemplate.vue_vue_type_script_setup_true_lang.hDjVH5bH.js";var J=typeof global=="object"&&global&&global.Object===Object&&global,X=typeof self=="object"&&self&&self.Object===Object&&self,P=J||X||Function("return this")(),v=P.Symbol,$=Object.prototype,q=$.hasOwnProperty,z=$.toString,b=v?v.toStringTag:void 0;function K(e){var n=q.call(e,b),r=e[b];try{e[b]=void 0;var i=!0}catch{}var l=z.call(e);return i&&(n?e[b]=r:delete e[b]),l}var Q=Object.prototype,Y=Q.toString;function Z(e){return Y.call(e)}var ee="[object Null]",ne="[object Undefined]",H=v?v.toStringTag:void 0;function te(e){return e==null?e===void 0?ne:ee:H&&H in Object(e)?K(e):Z(e)}function re(e){return e!=null&&typeof e=="object"}var oe="[object Symbol]";function ie(e){return typeof e=="symbol"||re(e)&&te(e)==oe}var ae=/\s/;function se(e){for(var n=e.length;n--&&ae.test(e.charAt(n)););return n}var le=/^\s+/;function ce(e){return e&&e.slice(0,se(e)+1).replace(le,"")}function x(e){var n=typeof e;return e!=null&&(n=="object"||n=="function")}var E=NaN,fe=/^[-+]0x[0-9a-f]+$/i,ue=/^0b[01]+$/i,de=/^0o[0-7]+$/i,me=parseInt;function N(e){if(typeof e=="number")return e;if(ie(e))return E;if(x(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=x(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=ce(e);var r=ue.test(e);return r||de.test(e)?me(e.slice(2),r?2:8):fe.test(e)?E:+e}var O=function(){return P.Date.now()},pe="Expected a function",be=Math.max,he=Math.min;function ve(e,n,r){var i,l,a,s,o,u,d=0,S=!1,m=!1,g=!0;if(typeof e!="function")throw new TypeError(pe);n=N(n)||0,x(r)&&(S=!!r.leading,m="maxWait"in r,a=m?be(N(r.maxWait)||0,n):a,g="trailing"in r?!!r.trailing:g);function T(t){var c=i,p=l;return i=l=void 0,d=t,s=e.apply(p,c),s}function B(t){return d=t,o=setTimeout(h,n),S?T(t):s}function W(t){var c=t-u,p=t-d,w=n-c;return m?he(w,a-p):w}function j(t){var c=t-u,p=t-d;return u===void 0||c>=n||c<0||m&&p>=a}function h(){var t=O();if(j(t))return _(t);o=setTimeout(h,W(t))}function _(t){return o=void 0,g&&i?T(t):(i=l=void 0,s)}function L(){o!==void 0&&clearTimeout(o),d=0,i=u=l=o=void 0}function M(){return o===void 0?s:_(O())}function y(){var t=O(),c=j(t);if(i=arguments,l=this,u=t,c){if(o===void 0)return B(u);if(m)return clearTimeout(o),o=setTimeout(h,n),T(u)}return o===void 0&&(o=setTimeout(h,n)),s}return y.cancel=L,y.flush=M,y}const ge=f("h1",{id:"showonhover-example",tabindex:"-1"},[V("ShowOnHover example "),f("a",{class:"header-anchor",href:"#showonhover-example","aria-label":'Permalink to "ShowOnHover example"'},"​")],-1),Te=f("p",null,"Scrollbar can be visible only on hover, please hover onto list to show scrollbars",-1),ye=f("hr",null,null,-1),Oe=f("br",null,null,-1),xe=f("hr",null,null,-1),Ie=JSON.parse('{"title":"ShowOnHover example","description":"","frontmatter":{},"headers":[],"relativePath":"examples/showOnHover.md","filePath":"examples/showOnHover.md","lastUpdated":1721620079000}'),Se={name:"examples/showOnHover.md"},ke=Object.assign(Se,{setup(e){const n=I(300),r=I(n.value),i=ve(l=>{r.value=n.value},200);return(l,a)=>(F(),U("div",null,[ge,Te,ye,A(f("input",{type:"range",id:"showOnHoverTransition",min:"0",max:"1500","onUpdate:modelValue":a[0]||(a[0]=s=>n.value=s),onInput:a[1]||(a[1]=(...s)=>k(i)&&k(i)(...s))},null,544),[[C,n.value]]),Oe,f("div",null,"Transition duration "+D(n.value)+"ms",1),xe,R(G,{"show-on-hover":parseInt(r.value)},null,8,["show-on-hover"])]))}});export{Ie as __pageData,ke as default};
