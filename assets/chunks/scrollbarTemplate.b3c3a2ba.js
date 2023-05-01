import{o as J,c as K,_ as ee,a as u,z as h}from"./framework.0ea375e9.js";const R=(n,i)=>{Array.from(n.style).forEach(o=>{o.startsWith(`--${i}-`)&&n.style.removeProperty(o)})},F=(n,i)=>{n.classList.remove(...Array.from(n.classList).filter(o=>o.startsWith(i)))},V=(n,i)=>{i?n.setAttribute("tabIndex",i):n.removeAttribute("tabIndex")};var _,v;function L(){return L=Object.assign?Object.assign.bind():function(n){for(var i=1;i<arguments.length;i++){var o=arguments[i];for(var p in o)Object.prototype.hasOwnProperty.call(o,p)&&(n[p]=o[p])}return n},L.apply(this,arguments)}(function(n){n.inside="inside",n.outside="outside"})(_||(_={})),function(n){n[n.InnerGenerated=0]="InnerGenerated",n[n.InnerParent=1]="InnerParent",n[n.OuterGenerated=2]="OuterGenerated",n[n.OuterParent=3]="OuterParent"}(v||(v={}));const b=n=>n==="y",Q=n=>b(n)?"x":"y",U=n=>n?"height":"width",te=n=>b(n)?"scrollTop":"scrollLeft",re=n=>U(b(n)),ne=n=>U(!b(n)),se=(n,i)=>b(n)?i.bar.y.width:i.bar.x.height,f=(n,i)=>{["x","y"].forEach(o=>{i({dir:o,isDirY:b(o),isLeftOrTop:te(o),reverseDir:Q(o),dimensionLong:re(o),dimensionShort:ne(o),scrollbarShort:se(o,n),scrollbarOffsetLong:n.bar[o].offset[~~b(o)],scrollbarOffsetShort:n.bar[o].offset[~~!b(o)]})})};let g,Y=null,M=null;const y="ls",X=(n,i)=>{if(i)for(;n.firstChild;)i.appendChild(n.firstChild)},oe={bar:{y:{width:6,offset:[0,0]},x:{height:6,offset:[0,0]}},className:"light-scrollbar",disableFocusPrevent:!0,wrapperPlacement:_.inside,showOnHover:!1},_e=(n,i={})=>{if(!n)return;const o=((e,r)=>{var s,a,c,m;return L({},e,r,{bar:{y:L({},e==null||(s=e.bar)==null?void 0:s.y,r==null||(a=r.bar)==null?void 0:a.y),x:L({},e==null||(c=e.bar)==null?void 0:c.x,r==null||(m=r.bar)==null?void 0:m.x)}})})(oe,i),p=o.wrapperElement||document.createElement("div");(function(e,r,s){if(Y=r.getAttribute("tabindex"),M=e.getAttribute("tabindex"),s.wrapperPlacement==="outside"){var a;if(r.children[0]===e)return void(g=v.OuterParent);g=v.OuterGenerated,e==null||(a=e.parentNode)==null||a.insertBefore(r,e),r.appendChild(e)}else{var c,m;for(r.children[0]===e?(e==null||(c=e.parentNode)==null||(m=c.parentNode)==null||m.insertBefore(e,r),g=v.InnerParent):g=v.InnerGenerated;e.firstChild;)r.appendChild(e.firstChild);e.appendChild(r)}})(n,p,o);const w=o.wrapperPlacement==="outside",l=w?n:p,d=w?p:n;l.classList.add(o.className),l.classList.add(`${o.className}-wrapper-${_.inside}`),w||(l.dataset.lsCreated=""),d.classList.add(o.className);const P=`${o.className}-wrapper-${_.outside}`;d.classList.add(P),o.showOnHover!==!1&&(d.classList.add(`${o.className}-wrapper-${_.outside}--show-on-hover`),d.style.setProperty(`--${y}-show-on-hover`,`${o.showOnHover}ms`)),d.setAttribute("tabindex","-1"),((e,r)=>{f(e,({dir:s,dimensionShort:a,scrollbarShort:c,scrollbarOffsetShort:m})=>{r.style.setProperty(`--${y}-bar-${s}-${a}`,`${c}px`),r.style.setProperty(`--${y}-bar-${s}-offset-${Q(s)}`,`${m}px`)})})(o,d);let O=l.getBoundingClientRect();const t={c:{x:0,y:0,a:!1,b:!1},d:10,e:{width:0,height:0},f:{width:0,height:0},k:{x:{g:!1,h:!1},y:{g:!1,h:!1}},ar:{x:{h:!1,g:!1,n:!1,o:0,u:{r:{p:0,q:0},t:{q:0}},aa:{p:0,q:0,z:0},ab:0},y:{h:!1,g:!1,n:!1,o:0,u:{r:{p:0,q:0},t:{q:0}},ab:0,aa:{p:0,q:0,z:0}}}},S=e=>{t.c.x=e.clientX-O.left,t.c.y=e.clientY-O.top},k=({reverseDir:e,dimensionShort:r,scrollbarShort:s,scrollbarOffsetShort:a})=>t.c[e]>=t.e[r]-s-a&&t.c[e]<t.e[r]-a,C=({dir:e,reverseDir:r,scrollbarShort:s,dimensionShort:a,scrollbarOffsetShort:c})=>{t.ar[e].g=k({dir:e,reverseDir:r,scrollbarShort:s,dimensionShort:a,scrollbarOffsetShort:c})&&t.c[e]>=t.ar[e].u.t.q&&t.c[e]<=t.ar[e].u.t.q+t.ar[e].aa.q,t.ar[e].h=!!t.ar[e].h||t.ar[e].g,d.classList.toggle(`hover-${e}`,t.ar[e].h)},Z=({dir:e,dimensionLong:r})=>{t.ar[e].aa.z=t.e[r]/t.f[r]*100;const s=t.ar[e].aa.z;t.ar[e].aa.p=s>=t.d?s:t.d,t.ar[e].aa.q=t.ar[e].aa.p/100*t.e[r];const a=t.ar[e].aa.p;d.style.setProperty(`--${y}-bar-${e}-${r}`,`${a>=100?0:a}%`)},q=(e,{dir:r,dimensionLong:s,isLeftOrTop:a})=>{var c;const m=r==="y"?"top":"left",x=(e==null||(c=e.target)==null?void 0:c[a])||l[a];let j=0,E=0;t.ar[r].aa.z<=t.d&&(j=t.d-t.ar[r].aa.z,E=t.e[s]*j/100),t.ar[r].u.r.p=x/t.f[s],t.ar[r].u.t.q=(x+t.e[s]-E)/t.f[s]*t.e[s]-t.ar[r].aa.q-2*E,d.style.setProperty(`--${y}-bar-${r}-${m}`,`${t.ar[r].u.t.q}px`)},N=(e,r=!1)=>{f(o,({dir:s,dimensionLong:a,isLeftOrTop:c})=>{t.k[s].h=!!t.k[s].h||t.k[s].g,t.k[s].h&&t.c.b&&(r&&e.preventDefault(),t.ar[s].n?t.ar[s].n=!0:(t.ar[s].n=t.ar[s].g,t.ar[s].o=t.ar[s].n?t.ar[s].u.t.q-t.c[s]:-t.ar[s].aa.q/2),d.classList.toggle(`active-${s}`,t.ar[s].n),t.ar[s].u.r.q=t.f[a]*((t.c[s]+t.ar[s].o)/t.e[a]),l[c]=t.ar[s].u.r.q)})},$=(e=!1)=>{e&&(t.e.height=l.clientHeight,t.e.width=l.clientWidth,t.f.height=l.scrollHeight,t.f.width=l.scrollWidth,f(o,r=>{Z(r),q(void 0,r)}))},I=e=>{var r;(r=e.target)!=null&&r.closest(`.${P}`)&&(S(e),t.c.a=!0,t.c.b=t.k.x.g||t.k.y.g,f(o,C))},A=e=>{S(e),t.c.a=!1,t.c.b=!1,f(o,r=>{t.k[r.dir].h=!1,t.ar[r.dir].h=!1,t.ar[r.dir].n=!1,d.classList.remove(`active-${r.dir}`),C(r)})},D=e=>{S(e),O=l.getBoundingClientRect(),t.c.a?(l.classList.add("no-smooth"),N(e)):(t.ar.y.h=!1,t.ar.x.h=!1,l.classList.remove("no-smooth")),f(o,C)},B=()=>{((e=!1)=>{e&&f(o,({dir:r,reverseDir:s,dimensionLong:a,dimensionShort:c,scrollbarShort:m,scrollbarOffsetShort:x})=>{t.k[r].g=k({dir:r,reverseDir:s,scrollbarShort:m,dimensionShort:c,scrollbarOffsetShort:x})&&t.c[r]<=t.e[a]&&t.c[r]>=0})})(!0),$(!0)},z=e=>{S(e),N(e,!0)},G=e=>{o.disableFocusPrevent&&(t.k.x.g||t.k.y.g)&&(e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation())},T=e=>f(o,r=>q(e,r)),H=new ResizeObserver(()=>$(!0));H.observe(l);const W=new MutationObserver(()=>$(!0));return W.observe(l,{childList:!0,subtree:!0,characterData:!0}),$(!0),l.addEventListener("scroll",T,{passive:!0}),d.addEventListener("click",z),d.addEventListener("mousemove",B,{passive:!0}),d.addEventListener("focus",G),window.addEventListener("mousedown",I,{passive:!0}),window.addEventListener("mouseup",A,{passive:!0}),window.addEventListener("mousemove",D,{passive:!0}),{detach:()=>{H.disconnect(),W.disconnect(),l.removeEventListener("scroll",T),d.removeEventListener("click",z),d.removeEventListener("mousemove",B),d.removeEventListener("focus",G),window.removeEventListener("mousedown",I),window.removeEventListener("mouseup",A),window.removeEventListener("mousemove",D),((e,r,s)=>{if(g===v.InnerGenerated)X(r,e),r.remove();else if(g===v.InnerParent){var a;X(r,e),e==null||(a=e.parentNode)==null||a.insertBefore(r,e),r.appendChild(e)}else g===v.OuterGenerated&&e.replaceWith(e.children[0]);F(e,s),F(r,s),R(e,y),R(r,y),V(e,M),V(r,Y),e.removeAttribute("data-ls-created"),r.removeAttribute("data-ls-created")})(d,l,o.className)},innerElement:l,outerElement:d}},Le={__name:"addItem",props:{instance:{type:Object,default:void 0}},setup(n){const i=n;let o=0;const p=()=>{if(!i.instance)return;o+=1;const w=document.createTextNode(`Additional items dynamically appended ${o}`),l=document.createElement("br");i.instance.prepend(w,l)};return(w,l)=>(J(),K("button",{class:"add-item",onClick:p},"Add Dynamically item"))}},ae={},ie={class:"my-scrollbar"},le=h("div",{class:"item"},[u(" Extra element with longer content, and on hover expand,"),h("br"),u(" showing that scrollbar is reactive ")],-1),de=h("br",null,null,-1),ce=h("br",null,null,-1),ue=h("br",null,null,-1),he=h("br",null,null,-1),me=h("br",null,null,-1),pe=h("br",null,null,-1),ve=h("br",null,null,-1),fe=h("br",null,null,-1),be=h("br",null,null,-1),ge=h("br",null,null,-1);function ye(n,i){return J(),K("div",ie,[le,u(" Some Content"),de,u(" Some Content"),ce,u(" Some Content"),ue,u(" Some Content"),he,u(" Some Content"),me,u(" Some Content"),pe,u(" Some Content"),ve,u(" Some Content"),fe,u(" Some Content"),be,u(" Some Content"),ge])}const Se=ee(ae,[["render",ye]]);export{Se as S,Le as _,_ as a,_e as w};