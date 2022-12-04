import{M as a}from"./index.afa9dd74.js";import{P as r}from"./SplitPane.75581b8f.js";import{c as e,m as l}from"./entry-client.0af9de6f.js";import{b as c,D as d,S as h,P as s,a as p}from"./mdx.1370b2ae.js";function i(t){const n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3",h2:"h2",ul:"ul",li:"li"},a(),t.components);return r||o("Page",!1),r.Content||o("Page.Content",!0),r.Header||o("Page.Header",!0),r.Title||o("Page.Title",!0),[e(n.h1,{children:"Page"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Page"}),` component defines the root element of the application, and functions as a container
for other layout elements.`]}}),`
`,e(d,{get children(){return e(c,{get children(){return e(r,{style:{position:"relative"},get children(){return[e(r.Header,{get children(){return e(r.Title,{get children(){return e(n.p,{children:"Header"})}})}}),e(r.Content,{style:{"min-height":"5rem"},get children(){return e(n.p,{children:"Page content goes here"})}})]}})}})}}),`
`,e(h,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<Page>
  <Page.Header>
    <Page.Title>
      Header
    </Page.Title>
  </Page.Header>
  <Page.Content>
    Page content goes here
  </Page.Content>
</Page>
`})}})}}),`
`,e(n.h3,{children:"Properties"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Page"}),` component has no special properties of its own. However, like all layout components,
it accepts both the standard Dolmen 'flex props' properies as well as the standard HTML element
properties.`]}}),`
`,e(n.p,{get children(){return["By default, ",e(n.code,{children:"Page"}),` uses flex layout in the 'column' direction. This can be overridden using flex
props.`]}}),`
`,e(n.h2,{children:"Page.Header"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Page.Header"}),` component creates a header element for the page. It accepts flex props, and
HTML div props.`]}}),`
`,e(n.h2,{children:"Page.Title"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Page.Title"})," component styles the page title, which is a child of the header."]}}),`
`,e(n.h2,{children:"Page.Content"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Page.Content"}),` component represents the middle portion of the page, below the header. By
default, it is a vertical flexbox, but this can be overridden with flex props.`]}}),`
`,e(n.h3,{children:"Properties"}),`
`,e(p,{get children(){return e(s,{name:"as",description:"Element type to render.",get type(){return e(n.ul,{get children(){return[e(n.li,{children:'"main"'}),e(n.li,{children:'"section"'}),e(n.li,{children:'"div"'})]}})}})}})]}function f(t={}){const{wrapper:n}=Object.assign({},a(),t.components);return n?e(n,l(t,{get children(){return e(i,t)}})):i(t)}function o(t,n){throw new Error("Expected "+(n?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};
