import{s,a1 as i,a2 as u,a3 as c,a4 as l,a5 as d,a6 as f,a7 as m,a8 as h,a9 as A,aa as g,ab as P,d as v,u as y,j as C,y as w,ac as _,ad as b,ae as E,af as R}from"./chunks/framework.e0a6002e.js";import{t as D}from"./chunks/theme.68901a4f.js";function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const o=p(D),j=v({name:"VitePressApp",setup(){const{site:e}=y();return C(()=>{w(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),_(),b(),E(),o.setup&&o.setup(),()=>R(o.Layout)}});async function O(){const e=T(),a=S();a.provide(u,e);const t=c(e.route);return a.provide(l,t),a.component("Content",d),a.component("ClientOnly",f),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:a,router:e,siteData:m}),{app:a,router:e,data:t}}function S(){return h(j)}function T(){let e=s,a;return A(t=>{let n=g(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=P(()=>import(n),[])),s&&(e=!1),r},o.NotFound)}s&&O().then(({app:e,router:a,data:t})=>{a.go().then(()=>{i(a.route,t.site),e.mount("#app")})});export{O as createApp};
