import{M as c}from"./index.851bda99.js";import{B as r}from"./SplitPane.abdc1c79.js";import{c as e,m as a}from"./entry-client.0e18877c.js";import{S as i}from"./Stack.1415a2e9.js";import{D as l,S as s}from"./mdx.00edb165.js";function o(t){const n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3"},c(),t.components);return[e(n.h1,{children:"Stack"}),`
`,e(n.p,{get children(){return["A ",e(n.code,{children:"Stack"}),` is a layout component which arranges its children vertically. (Basically it's
a flexbox with flex-direction set to `,e(n.code,{children:"column"}),")."]}}),`
`,e(l,{get children(){return e(i,{gap:"xl",get children(){return[e(r,{children:"Buffy"}),`
`,e(r,{children:"Angel"}),`
`,e(r,{children:"Xander"}),`
`,e(r,{children:"Willow"})]}})}}),`
`,e(s,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<Stack gap="xl">
  <Button>Buffy</Button>
  <Button>Angel</Button>
  <Button>Xander</Button>
  <Button>Willow</Button>
</Stack>
`})}})}}),`
`,e(n.h3,{children:"Properties"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Stack"}),` component has no special properties of its own. However, like all layout components,
it accepts both the standard Dolmen 'flex props' properies as well as the standard HTML element
properties.`]}})]}function g(t={}){const{wrapper:n}=Object.assign({},c(),t.components);return n?e(n,a(t,{get children(){return e(o,t)}})):o(t)}export{g as default};
