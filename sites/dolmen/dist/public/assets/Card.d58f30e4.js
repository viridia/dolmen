import{M as c}from"./index.afa9dd74.js";import{C as r}from"./SplitPane.75581b8f.js";import{c as e,m as a}from"./entry-client.0af9de6f.js";import{D as i,S as s}from"./mdx.1370b2ae.js";function o(t){const n=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h3:"h3"},c(),t.components);return r||d("Card",!1),r.Content||d("Card.Content",!0),[e(n.h1,{children:"Card"}),`
`,e(n.p,{get children(){return["A ",e(n.code,{children:"Card"})," displays a section of content."]}}),`
`,e(i,{get children(){return e(r,{get children(){return e(r.Content,{get children(){return e(n.p,{children:"This is a card"})}})}})}}),`
`,e(s,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<Card>
  <Card.Content>
    This is a card
  </Card.Content>
</Card>
`})}})}}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Card"}),` component by itself has no padding. This means you can insert a divider that extends
all the way to the edge of the card.`]}}),`
`,e(n.p,{get children(){return["To get the correct padding, use the ",e(n.code,{children:"Card.Content"})," component inside the card."]}}),`
`,e(n.h3,{children:"Properties"}),`
`,e(n.p,{get children(){return["The ",e(n.code,{children:"Card"})," and ",e(n.code,{children:"Card.Content"}),` components have no special properties of their own. However, like all
layout components, they accept both the standard Dolmen 'flex props' properies as well as the
standard HTML element properties.`]}})]}function C(t={}){const{wrapper:n}=Object.assign({},c(),t.components);return n?e(n,a(t,{get children(){return e(o,t)}})):o(t)}function d(t,n){throw new Error("Expected "+(n?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};
