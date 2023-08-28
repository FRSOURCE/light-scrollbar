import{w as i,a as d,A as E,_ as y}from"./chunks/scrollbarTemplate.vue_vue_type_script_setup_true_lang.44ccba98.js";import{d as u,h as m,j as _,o as p,c as o,H as n,F as g,k as s,a as t,Q as h}from"./chunks/framework.400955e3.js";const v=u({__name:"wrapperOutside",setup(r){const a=m(0);return _(()=>{const l=document.querySelector(".my-scrollbar");i(l,{wrapperPlacement:d.outside})}),(l,e)=>(p(),o(g,null,[n(E,{onClick:e[0]||(e[0]=c=>a.value+=c)}),n(y,{"additional-elements-number":a.value},null,8,["additional-elements-number"])],64))}});const b=s("h1",{id:"wrapper-outside-example",tabindex:"-1"},[t("Wrapper outside example "),s("a",{class:"header-anchor",href:"#wrapper-outside-example","aria-label":'Permalink to "Wrapper outside example"'},"​")],-1),f=s("p",null,[t("Example with settings, "),s("code",null,"wrapperPlacement: 'outside'")],-1),w=s("div",{class:"info custom-block"},[s("p",{class:"custom-block-title"},"STYLING"),s("p",null,"When applying styling such as padding or border will result in different result in position of scrollbar comparing to default (wrapper inside)")],-1),F=h(`<p>Before mount</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;my-scrollbar&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...content</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;my-scrollbar&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    ...content</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>After mount</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;light-scrollbar-wrapper-outside&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;my-scrollbar light-scrollbar light-scrollbar-wrapper-inside&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ...content</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;light-scrollbar-wrapper-outside&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;my-scrollbar light-scrollbar light-scrollbar-wrapper-inside&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        ...content</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,4),q=JSON.parse('{"title":"Wrapper outside example","description":"","frontmatter":{},"headers":[],"relativePath":"examples/wrapperOutside.md","filePath":"examples/wrapperOutside.md","lastUpdated":1693187118000}'),k={name:"examples/wrapperOutside.md"},A=Object.assign(k,{setup(r){return(a,l)=>(p(),o("div",null,[b,f,w,n(v),F]))}});export{q as __pageData,A as default};