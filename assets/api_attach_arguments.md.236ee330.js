import{_ as s,o as a,c as n,N as l}from"./chunks/framework.d674be69.js";const C=JSON.parse('{"title":"attach - arguments","description":"","frontmatter":{},"headers":[],"relativePath":"api/attach/arguments.md","lastUpdated":1679299815000}'),e={name:"api/attach/arguments.md"},p=l(`<h1 id="attach-arguments" tabindex="-1">attach - arguments <a class="header-anchor" href="#attach-arguments" aria-label="Permalink to &quot;attach - arguments&quot;">​</a></h1><p>Possible arguments that can be used in <code>attach</code> method.</p><h2 id="bar" tabindex="-1"><code>bar</code> <a class="header-anchor" href="#bar" aria-label="Permalink to &quot;\`bar\`&quot;">​</a></h2><p>General settings for scrollbar &quot;bar&quot; thickness and offset.</p><p><sup><sub><strong>Default value</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">bar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">y</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">width</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">6</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">offset</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">x</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">height</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">6</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">offset</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span></code></pre></div><p><sup><sub><strong>Type</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bar</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  y?</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    width?</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> number;</span></span>
<span class="line"><span style="color:#A6ACCD;">    offset</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> [number</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> number];</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  x</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    height?</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> number;</span></span>
<span class="line"><span style="color:#A6ACCD;">    offset</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> [number</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> number];</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><h2 id="classname" tabindex="-1"><code>className</code> <a class="header-anchor" href="#classname" aria-label="Permalink to &quot;\`className\`&quot;">​</a></h2><p>ClassName used to target HTMLElement that has <code>overflow: auto</code> on it, meaning is scrollable container.</p><p><sup><sub><strong>Default value</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">className</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">light-scrollbar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span></code></pre></div><p><sup><sub><strong>Type</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">className</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> string</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="disablefocusprevent" tabindex="-1"><code>disableFocusPrevent</code> <a class="header-anchor" href="#disablefocusprevent" aria-label="Permalink to &quot;\`disableFocusPrevent\`&quot;">​</a></h2><p>By default emitting focus event is disabled, means when scroll is initialized from this container no focus event will be emitted.</p><p><sup><sub><strong>Default value</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">disableFocusPrevent</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span></code></pre></div><p><sup><sub><strong>Type</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">disableFocusPrevent</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> boolean</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="wrapperplacement" tabindex="-1"><code>wrapperPlacement</code> <a class="header-anchor" href="#wrapperplacement" aria-label="Permalink to &quot;\`wrapperPlacement\`&quot;">​</a></h2><p>In order to create custom scrollbar, at this moment only possible solution is to wrap scrollable container with wrapper. This plugin can create wrapper inside your container and switch node and its all classes/attrs/listeners from original container to inner child, or create outside wrapper.</p><p><sup><sub><strong>Default value</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">wrapperPlacement</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> WrapperPlacement</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">inside</span><span style="color:#89DDFF;">,</span></span></code></pre></div><p><sup><sub><strong>Type</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">wrapperPlacement</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> WrapperPlacement</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">enum</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">WrapperPlacement</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">inside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">inside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">outside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">outside</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="wrapperelement" tabindex="-1"><code>wrapperElement</code> <a class="header-anchor" href="#wrapperelement" aria-label="Permalink to &quot;\`wrapperElement\`&quot;">​</a></h2><p>There is possibility to create wrapper element from given HTMLElement passed via this parameter.</p><p><sup><sub><strong>Default value</strong></sub></sup></p><p><code>null</code></p><p><sup><sub><strong>Type</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">wrapperElement</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> HTMLElement</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="showonhover" tabindex="-1"><code>showOnHover</code> <a class="header-anchor" href="#showonhover" aria-label="Permalink to &quot;\`showOnHover\`&quot;">​</a></h2><p>Scrollbars can be visible only when hover on container.</p><p><sup><sub><strong>Default value</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">showOnHover</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span></code></pre></div><p><sup><sub><strong>Type</strong></sub></sup></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">showOnHover</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> number </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span></code></pre></div>`,39),o=[p];function t(r,c,i,y,D,F){return a(),n("div",null,o)}const d=s(e,[["render",t]]);export{C as __pageData,d as default};
