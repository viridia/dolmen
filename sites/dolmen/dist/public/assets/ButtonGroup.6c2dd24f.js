import{M as c}from"./index.851bda99.js";import{B as r}from"./SplitPane.abdc1c79.js";import{s as l,g as i,b as d,m as u,r as p,t as h,c as t}from"./entry-client.0e18877c.js";import{G as m}from"./Group.e2a1de10.js";import{D as g,S as B}from"./mdx.00edb165.js";const f=h("<div></div>"),G=n=>{const[e,a]=l(n,["class","classList"]);return(()=>{const o=i(f);return d(o,u(a,{get classList(){return{...e.classList,[e.class]:!!e.class,"dm-button-group":!0}}}),!1,!1),p(),o})()};function s(n){const e=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h2:"h2"},c(),n.components);return[t(e.h1,{children:"ButtonGroup"}),`
`,t(e.p,{get children(){return["A ",t(e.code,{children:"ButtonGroup"})," is used to indicate that a group of buttons are related or part of a set."]}}),`
`,t(g,{get children(){return t(m,{gap:"md",get children(){return t(G,{get children(){return[t(r,{children:"One"}),`
`,t(r,{children:"Two"}),`
`,t(r,{selected:!0,children:"Three"}),`
`,t(r,{children:"Four"})]}})}})}}),`
`,t(B,{get children(){return t(e.pre,{get children(){return t(e.code,{className:"language-tsx",children:`<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button selected>Three</Button>
  <Button>Four</Button>
</ButtonGroup>
`})}})}}),`
`,t(e.h2,{children:"ButtonGroup properties"}),`
`,t(e.p,{get children(){return[t(e.code,{children:"ButtonGroup"})," accepts all of the parameters that a div element accepts."]}})]}function L(n={}){const{wrapper:e}=Object.assign({},c(),n.components);return e?t(e,u(n,{get children(){return t(s,n)}})):s(n)}export{L as default};
