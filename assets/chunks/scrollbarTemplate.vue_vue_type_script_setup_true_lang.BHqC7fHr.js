import{_ as U,o as S,c as x,j as P,F as k,d as Z,B as ee,a0 as re,a as te,t as ne}from"./framework.DA9XzHlA.js";const j=(n,o)=>{Array.from(n.style).forEach(s=>{s.startsWith(`--${o}-`)&&n.style.removeProperty(s)})},R=(n,o)=>{n.classList.remove(...Array.from(n.classList).filter(s=>s.startsWith(o)))},V=(n,o)=>{o?n.setAttribute("tabIndex",o):n.removeAttribute("tabIndex")};var g,m;function y(){return y=Object.assign?Object.assign.bind():function(n){for(var o=1;o<arguments.length;o++){var s=arguments[o];for(var u in s)({}).hasOwnProperty.call(s,u)&&(n[u]=s[u])}return n},y.apply(null,arguments)}(function(n){n.inside="inside",n.outside="outside"})(g||(g={})),function(n){n[n.InnerGenerated=0]="InnerGenerated",n[n.InnerParent=1]="InnerParent",n[n.OuterGenerated=2]="OuterGenerated",n[n.OuterParent=3]="OuterParent"}(m||(m={}));const p=n=>n==="y",J=n=>p(n)?"x":"y",K=n=>n?"height":"width",se=n=>p(n)?"scrollTop":"scrollLeft",ae=n=>K(p(n)),oe=n=>K(!p(n)),ie=(n,o)=>p(n)?o.bar.y.width:o.bar.x.height,v=(n,o)=>{["x","y"].forEach(s=>{o({dir:s,isDirY:p(s),isLeftOrTop:se(s),reverseDir:J(s),dimensionLong:ae(s),dimensionShort:oe(s),scrollbarShort:ie(s,n),scrollbarOffsetLong:n.bar[s].offset[~~p(s)],scrollbarOffsetShort:n.bar[s].offset[~~!p(s)]})})};let f,Y=null,M=null;const b="ls",X=(n,o)=>{if(o)for(;n.firstChild;)o.appendChild(n.firstChild)},le={bar:{y:{width:6,offset:[0,0]},x:{height:6,offset:[0,0]}},className:"light-scrollbar",disableFocusPrevent:!0,wrapperPlacement:g.inside,showOnHover:!1},he=(n,o={})=>{if(!n)return;const s=((e,t)=>{var a,i,c,h;return y({},e,t,{bar:{y:y({},e==null||(a=e.bar)==null?void 0:a.y,t==null||(i=t.bar)==null?void 0:i.y),x:y({},e==null||(c=e.bar)==null?void 0:c.x,t==null||(h=t.bar)==null?void 0:h.x)}})})(le,o),u=s.wrapperElement||document.createElement("div");(function(e,t,a){if(Y=t.getAttribute("tabindex"),M=e.getAttribute("tabindex"),a.wrapperPlacement==="outside"){var i;if(t.children[0]===e)return void(f=m.OuterParent);f=m.OuterGenerated,e==null||(i=e.parentNode)==null||i.insertBefore(t,e),t.appendChild(e)}else{var c;for(t.children[0]===e?(e==null||(c=e.parentNode)==null||(c=c.parentNode)==null||c.insertBefore(e,t),f=m.InnerParent):f=m.InnerGenerated;e.firstChild;)t.appendChild(e.firstChild);e.appendChild(t)}})(n,u,s);const O=s.wrapperPlacement==="outside",l=O?n:u,d=O?u:n;l.classList.add(s.className),l.classList.add(`${s.className}-wrapper-${g.inside}`),O||(l.dataset.lsCreated=""),d.classList.add(s.className);const q=`${s.className}-wrapper-${g.outside}`;d.classList.add(q),s.showOnHover!==!1&&(d.classList.add(`${s.className}-wrapper-${g.outside}--show-on-hover`),d.style.setProperty(`--${b}-show-on-hover`,`${s.showOnHover}ms`)),d.setAttribute("tabindex","-1"),((e,t)=>{v(e,({dir:a,dimensionShort:i,scrollbarShort:c,scrollbarOffsetShort:h})=>{t.style.setProperty(`--${b}-bar-${a}-${i}`,`${c}px`),t.style.setProperty(`--${b}-bar-${a}-offset-${J(a)}`,`${h}px`)})})(s,d);let C=l.getBoundingClientRect();const r={c:{x:0,y:0,a:!1,b:!1},d:10,e:{width:0,height:0},f:{width:0,height:0},k:{x:{g:!1,h:!1},y:{g:!1,h:!1}},ar:{x:{h:!1,g:!1,n:!1,o:0,u:{r:{p:0,q:0},t:{q:0}},aa:{p:0,q:0,z:0},ab:0},y:{h:!1,g:!1,n:!1,o:0,u:{r:{p:0,q:0},t:{q:0}},ab:0,aa:{p:0,q:0,z:0}}}},w=e=>{r.c.x=e.clientX-C.left,r.c.y=e.clientY-C.top},N=({reverseDir:e,dimensionShort:t,scrollbarShort:a,scrollbarOffsetShort:i})=>r.c[e]>=r.e[t]-a-i&&r.c[e]<r.e[t]-i,E=({dir:e,reverseDir:t,scrollbarShort:a,dimensionShort:i,scrollbarOffsetShort:c})=>{r.ar[e].g=N({dir:e,reverseDir:t,scrollbarShort:a,dimensionShort:i,scrollbarOffsetShort:c})&&r.c[e]>=r.ar[e].u.t.q&&r.c[e]<=r.ar[e].u.t.q+r.ar[e].aa.q,r.ar[e].h=!!r.ar[e].h||r.ar[e].g,d.classList.toggle(`hover-${e}`,r.ar[e].h)},Q=({dir:e,dimensionLong:t})=>{r.ar[e].aa.z=r.e[t]/r.f[t]*100;const a=r.ar[e].aa.z;r.ar[e].aa.p=a>=r.d?a:r.d,r.ar[e].aa.q=r.ar[e].aa.p/100*r.e[t];const i=r.ar[e].aa.p;d.style.setProperty(`--${b}-bar-${e}-${t}`,`${i>=100?0:i}%`)},A=(e,{dir:t,dimensionLong:a,isLeftOrTop:i})=>{var c;const h=t==="y"?"top":"left",$=(e==null||(c=e.target)==null?void 0:c[i])||l[i];r.ar[t].u.r.p=$/r.f[a],r.ar[t].u.t.q=$/(r.f[a]-r.f[a]*r.ar[t].aa.z/100)*100/100*(r.e[a]-r.ar[t].aa.q),d.style.setProperty(`--${b}-bar-${t}-${h}`,`${r.ar[t].u.t.q}px`)},D=(e,t=!1)=>{v(s,({dir:a,dimensionLong:i,isLeftOrTop:c})=>{r.k[a].h=!!r.k[a].h||r.k[a].g,r.k[a].h&&r.c.b&&(t&&e.preventDefault(),r.ar[a].n?r.ar[a].n=!0:(r.ar[a].n=r.ar[a].g,r.ar[a].o=r.ar[a].n?r.ar[a].u.t.q-r.c[a]:-r.ar[a].aa.q/2),d.classList.toggle(`active-${a}`,r.ar[a].n),r.ar[a].u.r.q=r.f[i]*((r.c[a]+r.ar[a].o)/r.e[i]),l[c]=r.ar[a].u.r.q)})},L=(e=!1)=>{e&&(r.e.height=l.clientHeight,r.e.width=l.clientWidth,r.f.height=l.scrollHeight,r.f.width=l.scrollWidth,v(s,t=>{Q(t),A(void 0,t)}))},I=e=>{var t;(t=e.target)!=null&&t.closest(`.${q}`)&&(w(e),r.c.a=!0,r.c.b=r.k.x.g||r.k.y.g,v(s,E))},B=e=>{w(e),r.c.a=!1,r.c.b=!1,v(s,t=>{r.k[t.dir].h=!1,r.ar[t.dir].h=!1,r.ar[t.dir].n=!1,d.classList.remove(`active-${t.dir}`),E(t)})},G=e=>{w(e),C=l.getBoundingClientRect(),r.c.a?(l.classList.add("no-smooth"),D(e)):(r.ar.y.h=!1,r.ar.x.h=!1,l.classList.remove("no-smooth")),v(s,E)},_=()=>{((e=!1)=>{e&&v(s,({dir:t,reverseDir:a,dimensionLong:i,dimensionShort:c,scrollbarShort:h,scrollbarOffsetShort:$})=>{r.k[t].g=N({dir:t,reverseDir:a,scrollbarShort:h,dimensionShort:c,scrollbarOffsetShort:$})&&r.c[t]<=r.e[i]&&r.c[t]>=0})})(!0),L(!0)},z=e=>{w(e),D(e,!0)},H=e=>{s.disableFocusPrevent&&(r.k.x.g||r.k.y.g)&&(e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation())},T=e=>v(s,t=>A(e,t)),W=new ResizeObserver(()=>L(!0));W.observe(l);const F=new MutationObserver(()=>L(!0));return F.observe(l,{childList:!0,subtree:!0,characterData:!0}),L(!0),l.addEventListener("scroll",T,{passive:!0}),d.addEventListener("click",z),d.addEventListener("mousemove",_,{passive:!0}),d.addEventListener("focus",H),window.addEventListener("mousedown",I,{passive:!0}),window.addEventListener("mouseup",B,{passive:!0}),window.addEventListener("mousemove",G,{passive:!0}),{detach:()=>{W.disconnect(),F.disconnect(),l.removeEventListener("scroll",T),d.removeEventListener("click",z),d.removeEventListener("mousemove",_),d.removeEventListener("focus",H),window.removeEventListener("mousedown",I),window.removeEventListener("mouseup",B),window.removeEventListener("mousemove",G),((e,t,a)=>{if(f===m.InnerGenerated)X(t,e),t.remove();else if(f===m.InnerParent){var i;X(t,e),e==null||(i=e.parentNode)==null||i.insertBefore(t,e),t.appendChild(e)}else f===m.OuterGenerated&&e.replaceWith(e.children[0]);R(e,a),R(t,a),j(e,b),j(t,b),V(e,M),V(t,Y),e.removeAttribute("data-ls-created"),t.removeAttribute("data-ls-created")})(d,l,s.className)},innerElement:l,outerElement:d}},de={};function ce(n,o){return S(),x(k,null,[P("button",{class:"add-item",onClick:o[0]||(o[0]=s=>n.$emit("click",1))},"Add Dynamically item"),P("button",{class:"add-item",onClick:o[1]||(o[1]=s=>n.$emit("click",100))},"Add Dynamically 100 items")],64)}const ve=U(de,[["render",ce]]),ue={class:"my-scrollbar"},pe=Z({__name:"scrollbarTemplate",props:{additionalElementsNumber:{type:Number,default:0}},setup(n){return(o,s)=>(S(),x("div",ue,[(S(!0),x(k,null,ee(n.additionalElementsNumber,u=>(S(),x(k,null,[te("Additional items dynamically appended "+ne(u),1),s[0]||(s[0]=P("br",null,null,-1))],64))),256)),s[1]||(s[1]=re('<div class="item"> Extra element with longer content, and on hover expand,<br> showing that scrollbar is reactive </div> Some Content<br> Some Content<br> Some Content<br> Some Content<br> Some Content<br> Some Content<br> Some Content<br> Some Content<br> Some Content<br> Some Content<br>',21))]))}});export{ve as A,pe as _,g as a,he as w};
