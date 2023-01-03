import{_ as s,o as a,c as n,a as l}from"./app.a4ad7300.js";const C=JSON.parse('{"title":"attach","description":"","frontmatter":{},"headers":[],"relativePath":"api/attach.md","lastUpdated":1672756667000}'),t={name:"api/attach.md"},o=l(`<h1 id="attach" tabindex="-1">attach <a class="header-anchor" href="#attach" aria-hidden="true">#</a></h1><p>Method used to initialize plugin.</p><p>e.g</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">attach</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">WrapperPlacement</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">light-scrollbar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> scrollbarContainerElement </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.my-scrollbar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> innerElement</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> outerElement</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> detach </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">attach</span><span style="color:#A6ACCD;">(scrollbarContainerElement</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">wrapperPlacement</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> WrapperPlacement</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">outside</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>More API details:</p><ul><li><a href="/light-scrollbar/api/attach/arguments.html">attach arguments</a></li><li><a href="/light-scrollbar/api/attach/returns.html">attach returns</a></li><li><a href="/light-scrollbar/api/detach.html">detach</a></li></ul>`,6),p=[o];function e(c,r,D,y,i,F){return a(),n("div",null,p)}const h=s(t,[["render",e]]);export{C as __pageData,h as default};