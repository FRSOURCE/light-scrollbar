import{p as k,c as A,j as u,a as C,a1 as D,a2 as R,k as H,t as V,G as F,o as G}from"./chunks/framework.DA9XzHlA.js";import{_}from"./chunks/default.vue_vue_type_style_index_0_lang.CycikW9B.js";import"./chunks/scrollbarTemplate.vue_vue_type_script_setup_true_lang.BHqC7fHr.js";var J=typeof global=="object"&&global&&global.Object===Object&&global,X=typeof self=="object"&&self&&self.Object===Object&&self,$=J||X||Function("return this")(),g=$.Symbol,B=Object.prototype,q=B.hasOwnProperty,z=B.toString,b=g?g.toStringTag:void 0;function K(e){var n=q.call(e,b),i=e[b];try{e[b]=void 0;var a=!0}catch{}var l=z.call(e);return a&&(n?e[b]=i:delete e[b]),l}var Q=Object.prototype,Y=Q.toString;function Z(e){return Y.call(e)}var ee="[object Null]",ne="[object Undefined]",E=g?g.toStringTag:void 0;function te(e){return e==null?e===void 0?ne:ee:E&&E in Object(e)?K(e):Z(e)}function re(e){return e!=null&&typeof e=="object"}var ie="[object Symbol]";function oe(e){return typeof e=="symbol"||re(e)&&te(e)==ie}var ae=/\s/;function se(e){for(var n=e.length;n--&&ae.test(e.charAt(n)););return n}var le=/^\s+/;function fe(e){return e&&e.slice(0,se(e)+1).replace(le,"")}function x(e){var n=typeof e;return e!=null&&(n=="object"||n=="function")}var N=NaN,ue=/^[-+]0x[0-9a-f]+$/i,de=/^0b[01]+$/i,ce=/^0o[0-7]+$/i,me=parseInt;function P(e){if(typeof e=="number")return e;if(oe(e))return N;if(x(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=x(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=fe(e);var i=de.test(e);return i||ce.test(e)?me(e.slice(2),i?2:8):ue.test(e)?N:+e}var O=function(){return $.Date.now()},pe="Expected a function",be=Math.max,ve=Math.min;function ge(e,n,i){var a,l,t,s,o,d,c=0,S=!1,m=!1,T=!0;if(typeof e!="function")throw new TypeError(pe);n=P(n)||0,x(i)&&(S=!!i.leading,m="maxWait"in i,t=m?be(P(i.maxWait)||0,n):t,T="trailing"in i?!!i.trailing:T);function h(r){var f=a,p=l;return a=l=void 0,c=r,s=e.apply(p,f),s}function W(r){return c=r,o=setTimeout(v,n),S?h(r):s}function L(r){var f=r-d,p=r-c,I=n-f;return m?ve(I,t-p):I}function j(r){var f=r-d,p=r-c;return d===void 0||f>=n||f<0||m&&p>=t}function v(){var r=O();if(j(r))return w(r);o=setTimeout(v,L(r))}function w(r){return o=void 0,T&&a?h(r):(a=l=void 0,s)}function M(){o!==void 0&&clearTimeout(o),c=0,a=d=l=o=void 0}function U(){return o===void 0?s:w(O())}function y(){var r=O(),f=j(r);if(a=arguments,l=this,d=r,f){if(o===void 0)return W(d);if(m)return clearTimeout(o),o=setTimeout(v,n),h(d)}return o===void 0&&(o=setTimeout(v,n)),s}return y.cancel=M,y.flush=U,y}const xe=JSON.parse('{"title":"ShowOnHover example","description":"","frontmatter":{},"headers":[],"relativePath":"examples/showOnHover.md","filePath":"examples/showOnHover.md","lastUpdated":1726869191000}'),Te={name:"examples/showOnHover.md"},Se=Object.assign(Te,{setup(e){const n=k(300),i=k(n.value),a=ge(l=>{i.value=n.value},200);return(l,t)=>(G(),A("div",null,[t[2]||(t[2]=u("h1",{id:"showonhover-example",tabindex:"-1"},[C("ShowOnHover example "),u("a",{class:"header-anchor",href:"#showonhover-example","aria-label":'Permalink to "ShowOnHover example"'},"​")],-1)),t[3]||(t[3]=u("p",null,"Scrollbar can be visible only on hover, please hover onto list to show scrollbars",-1)),t[4]||(t[4]=u("hr",null,null,-1)),D(u("input",{type:"range",id:"showOnHoverTransition",min:"0",max:"1500","onUpdate:modelValue":t[0]||(t[0]=s=>n.value=s),onInput:t[1]||(t[1]=(...s)=>H(a)&&H(a)(...s))},null,544),[[R,n.value]]),t[5]||(t[5]=u("br",null,null,-1)),u("div",null,"Transition duration "+V(n.value)+"ms",1),t[6]||(t[6]=u("hr",null,null,-1)),F(_,{"show-on-hover":parseInt(i.value)},null,8,["show-on-hover"])]))}});export{xe as __pageData,Se as default};
