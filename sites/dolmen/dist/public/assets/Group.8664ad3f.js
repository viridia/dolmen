import{M as c}from"./index.851bda99.js";import{B as t}from"./SplitPane.abdc1c79.js";import{c as e,m as i}from"./entry-client.0e18877c.js";import{G as p}from"./Group.e2a1de10.js";import{D as a,S as l}from"./mdx.00edb165.js";function r(o){const n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3"},c(),o.components);return[e(n.h1,{children:"Group"}),`
`,e(n.p,{get children(){return["A ",e(n.code,{children:"Group"}),` is a layout component which arranges its children horizontally. (Basically it's
a flexbox with flex-direction set to `,e(n.code,{children:"row"}),")."]}}),`
`,e(a,{get children(){return e(p,{gap:"xl",get children(){return[e(t,{children:"Groucho"}),`
`,e(t,{children:"Chico"}),`
`,e(t,{children:"Harpo"}),`
`,e(t,{children:"Zeppo"})]}})}}),`
`,e(l,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<Group gap="xl">
  <Button>Groucho</Button>
  <Button>Chico</Button>
  <Button>Harpo</Button>
  <Button>Zeppo</Button>
</Group>
`})}})}}),`
`,e(n.h3,{children:"Properties"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Group"}),` component has no special properties of its own. However, like all layout components,
it accepts both the standard Dolmen 'flex props' properies as well as the standard HTML element
properties.`]}})]}function g(o={}){const{wrapper:n}=Object.assign({},c(),o.components);return n?e(n,i(o,{get children(){return e(r,o)}})):r(o)}export{g as default};
