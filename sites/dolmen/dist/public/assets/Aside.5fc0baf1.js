import{M as a}from"./index.851bda99.js";import{P as r}from"./SplitPane.abdc1c79.js";import{c as e,m as s}from"./entry-client.0e18877c.js";import{A as c}from"./Aside.51638252.js";import{G as d}from"./Group.e2a1de10.js";import{b as l,D as p,S as g}from"./mdx.00edb165.js";function i(t){const n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3"},a(),t.components);return r||o("Page",!1),r.Content||o("Page.Content",!0),r.Header||o("Page.Header",!0),r.Title||o("Page.Title",!0),[e(n.h1,{children:"Aside"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Aside"})," component displays a sidebar."]}}),`
`,e(p,{get children(){return e(l,{get children(){return e(r,{style:{position:"relative"},get children(){return[e(r.Header,{get children(){return e(r.Title,{get children(){return e(n.p,{children:"Header"})}})}}),e(d,{style:{"min-height":"5rem"},alignItems:"stretch",get children(){return[e(c,{get children(){return e(n.p,{children:"Aside content"})}}),e(r.Content,{get children(){return e(n.p,{children:"Page content goes here"})}})]}})]}})}})}}),`
`,e(g,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<Page style={{ position: 'relative' }}>
  <Page.Header>
    <Page.Title>
      Header
    </Page.Title>
  </Page.Header>
  <Group style={{ 'min-height': '5rem' }} alignItems="stretch">
    <Aside>
      Aside content
    </Aside>
    <Page.Content>
      Page content goes here
    </Page.Content>
  </Group>
</Page>
`})}})}}),`
`,e(n.h3,{children:"Properties"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Aside"}),` component has no special properties of its own. However, like all layout components,
it accepts both the standard Dolmen 'flex props' properies as well as the standard HTML element
properties.`]}})]}function A(t={}){const{wrapper:n}=Object.assign({},a(),t.components);return n?e(n,s(t,{get children(){return e(i,t)}})):i(t)}function o(t,n){throw new Error("Expected "+(n?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{A as default};
