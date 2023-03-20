import{L as c,a as i,_ as D,S as F}from"./chunks/scrollbarTemplate.762bee61.js";import{f as d,h as y,o as t,c as p,C as n,F as _,x as s,a as o,N as u}from"./chunks/framework.d674be69.js";const m={__name:"wrapperOutside",setup(r){const a=d();return y(()=>{const e=document.querySelector(".my-scrollbar"),{innerElement:l}=c(e,{wrapperPlacement:i.outside});a.value=l}),(e,l)=>(t(),p(_,null,[n(D,{instance:a.value},null,8,["instance"]),n(F)],64))}},h=s("h1",{id:"wrapper-outside-example",tabindex:"-1"},[o("wrapper outside example "),s("a",{class:"header-anchor",href:"#wrapper-outside-example","aria-label":'Permalink to "wrapper outside example"'},"​")],-1),g=s("p",null,[o("Example with settings, "),s("code",null,"wrapperPlacement: 'outside'")],-1),C=u(`<p>Before mount</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-scrollbar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...content</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>After mount</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">light-scrollbar-wrapper-outside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-scrollbar light-scrollbar light-scrollbar-wrapper-inside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...content</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,4),A=JSON.parse('{"title":"wrapper outside example","description":"","frontmatter":{},"headers":[],"relativePath":"examples/wrapperOutside.md","lastUpdated":1679299536000}'),v={name:"examples/wrapperOutside.md"},f=Object.assign(v,{setup(r){return(a,e)=>(t(),p("div",null,[h,g,n(m),C]))}});export{A as __pageData,f as default};
