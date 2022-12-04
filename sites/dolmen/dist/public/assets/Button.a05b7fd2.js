import{g as f,b as T,r as M,t as S,c as e,m as P,i as l}from"./entry-client.0af9de6f.js";import{M as C}from"./index.afa9dd74.js";import{T as t,B as r}from"./SplitPane.75581b8f.js";import{G as s}from"./Group.8dd857b5.js";import{D as h,S as a,a as I}from"./mdx.1370b2ae.js";import"./LightMode.0db679b1.js";const Z=S('<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" role="img"><path fill="var(--icon-color)" d="M11.25 20.75v-5.5h1.5v2h8v1.5h-8v2Zm-8-2v-1.5h5.5v1.5Zm4-4v-2h-4v-1.5h4v-2h1.5v5.5Zm4-2v-1.5h9.5v1.5Zm4-4v-5.5h1.5v2h4v1.5h-4v2Zm-12-2v-1.5h9.5v1.5Z"></path></svg>'),m=i=>(()=>{const n=f(Z);return T(n,i,!0,!0),M(),n})(),E=S(`<ul><li></li>
<li></li>
<li></li>
<li></li></ul>`),G=S(`<ul><li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li></ul>`);function $(i){const n=Object.assign({h1:"h1",p:"p",h2:"h2",strong:"strong",pre:"pre",code:"code"},C(),i.components);return t||B("Table",!1),t.Cell||B("Table.Cell",!0),t.Row||B("Table.Row",!0),[e(n.h1,{children:"Button"}),`
`,e(n.p,{children:"Buttons help people initiate actions, from sending an email, to sharing a document, to liking a post."}),`
`,e(n.h2,{children:"Button Colors"}),`
`,e(n.p,{children:`Dolmen supports a small number color variants out of the box, although this can be extended
with custom styles.`}),`
`,e(n.p,{get children(){return[e(n.strong,{children:"Primary"}),` buttons are intended for calls to action. There should only be one primary button
within any page section or modal dialog.`]}}),`
`,e(n.p,{get children(){return[e(n.strong,{children:"Danger"}),` buttons are used to warn the user that the action is irreversible and may have serious
consequences.`]}}),`
`,e(h,{get children(){return e(s,{gap:"md",get children(){return[e(r,{children:"Default"}),`
`,e(r,{color:"primary",children:"Primary"}),`
`,e(r,{color:"danger",children:"Danger"}),`
`,e(r,{color:"subtle",children:"Subtle"})]}})}}),`
`,e(a,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<>
  <Button>Default</Button>
  <Button color="primary">Primary</Button>
  <Button color="danger">Danger</Button>
  <Button color="subtle">Subtle</Button>
</>
`})}})}}),`
`,e(n.h2,{children:"Button Icon Colors"}),`
`,e(n.p,{get children(){return["Icons can be used as children of a ",e(n.code,{children:"Button"})," component. The CSS variable ",e(n.code,{children:"--icon-color"}),` is set to
the icon color corresponding to the button's color scheme and theme. If you are using SVG icons,
you can add `,e(n.code,{children:'fill="var(--icon-color)"'}),` to your SVG elements, and they will automtically pick up the
icon color from the button.`]}}),`
`,e(h,{get children(){return e(s,{gap:"md",get children(){return[e(r,{get children(){return["Default ",e(m,{})]}}),`
`,e(r,{color:"primary",get children(){return["Primary ",e(m,{})]}}),`
`,e(r,{color:"danger",get children(){return["Danger ",e(m,{})]}}),`
`,e(r,{color:"subtle",get children(){return["Subtle ",e(m,{})]}})]}})}}),`
`,e(a,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<>
  <Button>Default</Button>
  <Button color="primary">Primary</Button>
  <Button color="danger">Danger</Button>
  <Button color="subtle">Subtle</Button>
</>
`})}})}}),`
`,e(n.h2,{children:"Button Sizes"}),`
`,e(h,{get children(){return e(s,{gap:"md",get children(){return[e(r,{size:"xl",children:'size="xl"'}),`
`,e(r,{size:"lg",children:'size="lg"'}),`
`,e(r,{size:"md",children:'size="md"'}),`
`,e(r,{size:"sm",children:'size="sm"'}),`
`,e(r,{size:"xs",children:'size="xs"'}),`
`,e(r,{size:"xxs",children:'size="xxs"'}),`
`,e(r,{size:"xxxs",children:'size="xxxs"'})]}})}}),`
`,e(a,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<>
  <Button size="xl">size="xl"</Button>
  <Button size="lg">size="lg"</Button>
  <Button size="md">size="md"</Button>
  <Button size="sm">size="sm"</Button>
  <Button size="xs">size="xs"</Button>
  <Button size="xxs">size="xxs"</Button>
  <Button size="xxxs">size="xxxs"</Button>
</>
`})}})}}),`
`,e(n.h2,{children:"Button Variants"}),`
`,e(h,{get children(){return e(s,{gap:"md",get children(){return[e(r,{children:"Normal"}),`
`,e(r,{round:!0,children:"Round"}),`
`,e(r,{icon:!0,children:"icon"}),`
`,e(r,{icon:!0,round:!0,children:"r/i"})]}})}}),`
`,e(a,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<>
  <Button>Normal</Button>
  <Button round>Round</Button>
  <Button icon>icon</Button>
  <Button icon round>r/i</Button>
</>
`})}})}}),`
`,e(n.h2,{children:"Button States"}),`
`,e(h,{get children(){return e(s,{gap:"md",get children(){return[e(r,{children:"Normal"}),`
`,e(r,{disabled:!0,children:"disabled"}),`
`,e(r,{selected:!0,children:"selected"})]}})}}),`
`,e(a,{get children(){return e(n.pre,{get children(){return e(n.code,{className:"language-tsx",children:`<>
  <Button>Normal</Button>
  <Button disabled>disabled</Button>
  <Button selected>selected</Button>
</>
`})}})}}),`
`,e(n.h2,{children:"Button properties"}),`
`,e(I,{get children(){return[e(t.Row,{get children(){return[e(t.Cell,{children:"color"}),`
`,e(t.Cell,{children:"Button color scheme"}),e(t.Cell,{get children(){const o=f(E),c=o.firstChild,p=c.nextSibling,d=p.nextSibling,x=d.nextSibling,u=x.nextSibling,b=u.nextSibling,g=b.nextSibling;return l(c,e(n.code,{children:"default"})),l(d,e(n.code,{children:"primary"})),l(u,e(n.code,{children:"danger"})),l(g,e(n.code,{children:"subtle"})),o}})]}}),e(t.Row,{get children(){return[e(t.Cell,{children:"size"}),`
`,e(t.Cell,{children:"Button size"}),e(t.Cell,{get children(){const o=f(G),c=o.firstChild,p=c.nextSibling,d=p.nextSibling,x=d.nextSibling,u=x.nextSibling,b=u.nextSibling,g=b.nextSibling,y=g.nextSibling,v=y.nextSibling,w=v.nextSibling,z=w.nextSibling,D=z.nextSibling,_=D.nextSibling,N=_.nextSibling,R=N.nextSibling;return l(c,e(n.code,{children:"xl"})),l(d,e(n.code,{children:"lg"})),l(u,e(n.code,{children:"md"})),l(g,e(n.code,{children:"sm"})),l(v,e(n.code,{children:"xl"})),l(z,e(n.code,{children:"xs"})),l(_,e(n.code,{children:"xxs"})),l(R,e(n.code,{children:"xxxs"})),o}})]}}),e(t.Row,{get children(){return[e(t.Cell,{children:"selected"}),e(t.Cell,{get children(){return e(n.p,{children:'Whether the button should be rendered in a selected or "toggled" state.'})}}),e(t.Cell,{get children(){return e(n.p,{children:"boolean"})}})]}}),e(t.Row,{get children(){return[e(t.Cell,{children:"round"}),e(t.Cell,{get children(){return e(n.p,{children:"If true, render the button as a circle or pill shape."})}}),e(t.Cell,{get children(){return e(n.p,{children:"boolean"})}})]}}),e(t.Row,{get children(){return[e(t.Cell,{children:"icon"}),e(t.Cell,{get children(){return e(n.p,{children:"If true, removes the button padding and ensures the width is the same as the height."})}}),e(t.Cell,{get children(){return e(n.p,{children:"boolean"})}})]}})]}}),`
`,e(n.p,{get children(){return["In addition, the ",e(n.code,{children:"Button"}),` element accepts all of the standard attributes of the HTML <button>
element.`]}})]}function X(i={}){const{wrapper:n}=Object.assign({},C(),i.components);return n?e(n,P(i,{get children(){return e($,i)}})):$(i)}function B(i,n){throw new Error("Expected "+(n?"component":"object")+" `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{X as default};
