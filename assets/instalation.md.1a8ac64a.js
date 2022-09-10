import{_ as s,o as a,c as n,d as l}from"./app.7cee17ae.js";const A=JSON.parse('{"title":"Instalation","description":"","frontmatter":{},"headers":[{"level":3,"title":"Modern JS/Typescript","slug":"modern-js-typescript","link":"#modern-js-typescript","children":[]},{"level":3,"title":"UMD","slug":"umd","link":"#umd","children":[]}],"relativePath":"instalation.md","lastUpdated":1662798401000}'),e={name:"instalation.md"},o=l(`<h1 id="instalation" tabindex="-1">Instalation <a class="header-anchor" href="#instalation" aria-hidden="true">#</a></h1><p>Light scrollbar was created for minumim DOM alteration. Wrapping element is still required, but this is only DOM change light-scrollbar do. Scrollbar itself is created based on pseudo elements <code>after</code> and <code>before</code>. What is special about light-scrollbar? that it can wrap scrollable container <code>inside</code> and <code>outside</code> (more in <a href="/examples/default">Examples</a> page )</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#676E95;"># npm</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install @frsource/light-scrollbar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Yarn</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn add @frsource/light-scrollbar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Pnpm</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm add @frsource/light-scrollbar</span></span>
<span class="line"></span></code></pre></div><h3 id="modern-js-typescript" tabindex="-1">Modern JS/Typescript <a class="header-anchor" href="#modern-js-typescript" aria-hidden="true">#</a></h3><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">attach</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@frsource/light-scrollbar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> scrollingElement </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">element-width-overflow-auto</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">attach</span><span style="color:#A6ACCD;">(scrollingElement)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h3 id="umd" tabindex="-1">UMD <a class="header-anchor" href="#umd" aria-hidden="true">#</a></h3><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> scrollingElement </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">element-width-overflow-auto</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">lightScrollbar</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">attach</span><span style="color:#A6ACCD;">(scrollingElement)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div>`,7),p=[o];function t(c,r,i,d,D,y){return a(),n("div",null,p)}const u=s(e,[["render",t]]);export{A as __pageData,u as default};
