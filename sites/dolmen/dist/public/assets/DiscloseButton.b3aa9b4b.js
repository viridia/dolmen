import{M as c}from"./index.851bda99.js";import"./SplitPane.abdc1c79.js";import{g as a,b as l,r as i,t as d,s as h,m as p,i as m,c as t,e as g}from"./entry-client.0e18877c.js";import{D as f,S as x,P as b,a as v,H as D}from"./mdx.00edb165.js";const w=d('<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" role="img"><path fill="var(--icon-color)" d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z"></path></svg>'),B=n=>(()=>{const e=a(w);return l(e,n,!0,!0),i(),e})(),C=d("<button></button>"),L=n=>{const[e,s]=h(n,["open","class","classList","children"]);return(()=>{const o=a(C);return l(o,p(s,{get classList(){return{...e.classList,[e.class]:!!e.class,"dm-disclose-button":!0,"dm-open":!!e.open}}}),!1,!0),m(o,t(B,{})),i(),o})()};function r(n){const e=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h2:"h2"},c(),n.components);return[t(e.h1,{children:"DiscloseButton"}),`
`,t(e.p,{get children(){return["A ",t(e.code,{children:"DiscloseButton"})," is used to hide or reveal a section of content."]}}),`
`,t(f,{children:()=>{const[s,o]=g(!1);return t(L,{get open(){return s()},onClick:()=>o(u=>!u)})}}),`
`,t(x,{get children(){return t(e.pre,{get children(){return t(e.code,{className:"language-tsx",children:`const [expand, setExpand] = createSignal(false);
return (<DiscloseButton open={expand()} onClick={() => setExpand(v => !v)} />);
`})}})}}),`
`,t(e.h2,{children:"DiscloseButton properties"}),`
`,t(v,{get children(){return t(b,{name:"open",description:"Open or close state of the button.",type:"boolean"})}}),`
`,t(e.p,{get children(){return["In addition, the ",t(e.code,{children:"DiscloseButton"}),` element accepts all of the standard attributes of the HTML
`,t(D,{children:"button"})," element."]}})]}function P(n={}){const{wrapper:e}=Object.assign({},c(),n.components);return e?t(e,p(n,{get children(){return t(r,n)}})):r(n)}export{P as default};
