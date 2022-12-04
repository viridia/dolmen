import{M as c}from"./index.afa9dd74.js";import{B as r}from"./SplitPane.75581b8f.js";import{c as e,m as a}from"./entry-client.0af9de6f.js";import{G as i}from"./Group.8dd857b5.js";import{S as s}from"./Spacer.aff46a8e.js";import{D as h,S as l}from"./mdx.1370b2ae.js";function o(t){const n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3"},c(),t.components);return[e(n.h1,{children:"Spacer"}),`
`,e(n.p,{get children(){return["A ",e(n.code,{children:"Spacer"})," is an invisible component that has a ",e(n.code,{children:"flex"}),` value set to 1. This makes it useful
when you want to insert some flexible space in-between other elements in a flex layout.`]}}),`
`,e(h,{get children(){return e(i,{get children(){return[e(r,{children:"Alpha"}),e(s,{}),e(r,{children:"Omega"})]}})}}),`
`,e(l,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<Group>
  <Button>Alpha</Button>
  <Spacer />
  <Button>Omega</Button>
</Group>
`})}})}}),`
`,e(n.h3,{children:"Properties"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Spacer"})," element has no defined properties, although it accepts the standard HTML attributes."]}})]}function S(t={}){const{wrapper:n}=Object.assign({},c(),t.components);return n?e(n,a(t,{get children(){return e(o,t)}})):o(t)}export{S as default};
