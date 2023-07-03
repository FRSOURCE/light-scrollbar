import{w as i,a as d,A as u,_ as D}from"./chunks/scrollbarTemplate.vue_vue_type_script_setup_true_lang.00224e77.js";import{d as F,h as m,j as y,o as t,c as o,J as l,F as _,k as s,a as p,U as h}from"./chunks/framework.83f2f551.js";const g=F({__name:"wrapperOutside",setup(r){const a=m(0);return y(()=>{const e=document.querySelector(".my-scrollbar");i(e,{wrapperPlacement:d.outside})}),(e,n)=>(t(),o(_,null,[l(u,{onClick:n[0]||(n[0]=c=>a.value+=c)}),l(D,{"additional-elements-number":a.value},null,8,["additional-elements-number"])],64))}});const C=s("h1",{id:"wrapper-outside-example",tabindex:"-1"},[p("Wrapper outside example "),s("a",{class:"header-anchor",href:"#wrapper-outside-example","aria-label":'Permalink to "Wrapper outside example"'},"​")],-1),b=s("p",null,[p("Example with settings, "),s("code",null,"wrapperPlacement: 'outside'")],-1),f=s("div",{class:"info custom-block"},[s("p",{class:"custom-block-title"},"STYLING"),s("p",null,"When applying styling such as padding or border will result in different result in position of scrollbar comparing to default (wrapper inside)")],-1),A=h(`<p>Before mount</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-scrollbar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...content</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>After mount</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">light-scrollbar-wrapper-outside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-scrollbar light-scrollbar light-scrollbar-wrapper-inside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...content</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div>`,4),E=JSON.parse('{"title":"Wrapper outside example","description":"","frontmatter":{},"headers":[],"relativePath":"examples/wrapperOutside.md","filePath":"examples/wrapperOutside.md","lastUpdated":1688355029000}'),v={name:"examples/wrapperOutside.md"},k=Object.assign(v,{setup(r){return(a,e)=>(t(),o("div",null,[C,b,f,l(g),A]))}});export{E as __pageData,k as default};