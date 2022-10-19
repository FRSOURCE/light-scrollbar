import{q as c,s as i,_ as D,S as F}from"./chunks/scrollbarTemplate.e3ce7ae6.js";import{r as d,e as y,o as p,c as t,f as e,F as _,a as s,b as o,d as u}from"./app.64a10e3f.js";const m={__name:"wrapperOutside",setup(r){const a=d();return y(()=>{const n=document.querySelector(".my-scrollbar"),{innerElement:l}=c(n,{wrapperPlacement:i.outside});a.value=l}),(n,l)=>(p(),t(_,null,[e(D,{instance:a.value},null,8,["instance"]),e(F)],64))}},g=s("h1",{id:"wrapper-outside-example",tabindex:"-1"},[o("wrapper outside example "),s("a",{class:"header-anchor",href:"#wrapper-outside-example","aria-hidden":"true"},"#")],-1),h=s("p",null,[o("Example with settings, "),s("code",null,"wrapperPlacement: 'outside'")],-1),C=u(`<p>Before mount</p><div class="language-html"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-scrollbar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...content</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>After mount</p><div class="language-html"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">light-scrollbar-wrapper-outside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-scrollbar light-scrollbar light-scrollbar-wrapper-inside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...content</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,4),f=JSON.parse('{"title":"wrapper outside example","description":"","frontmatter":{},"headers":[],"relativePath":"examples/wrapperOutside.md","lastUpdated":1666170308000}'),v={name:"examples/wrapperOutside.md"},w=Object.assign(v,{setup(r){return(a,n)=>(p(),t("div",null,[g,h,e(m),C]))}});export{f as __pageData,w as default};
