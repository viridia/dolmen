import{M as o}from"./index.851bda99.js";import"./SplitPane.abdc1c79.js";import{s as c,g as i,b as d,m as a,i as u,r as p,t as h,c as t}from"./entry-client.0e18877c.js";import{D as m,S as g,H as y}from"./mdx.00edb165.js";const f=h("<div></div>"),E=r=>{const[e,l]=c(r,["class","classList"]);return(()=>{const n=i(f);return d(n,a(l,{get classList(){return{...e.classList,[e.class]:!!e.class,"dm-empty-result":!0}}}),!1,!0),u(n,()=>r.children),p(),n})()};function s(r){const e=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h2:"h2"},o(),r.components);return[t(e.h1,{children:"EmptyResult"}),`
`,t(e.p,{get children(){return["The ",t(e.code,{children:"EmptyResult"}),` component is used to display a message indicating that a 'null' result
was returned. A 'null' result could be the result of a search or query that returned zero
records. It can also be used to describe a non-serious error or empty state. (Serious errors
should use a more prominent message such as an `,t(e.code,{children:"Alert"}),")."]}}),`
`,t(e.p,{get children(){return[`As a general rule, any UI that can display a variable number of results (zero or more) should
display an `,t(e.code,{children:"EmptyResult"})," when there is no data to display, instead of displaying nothing."]}}),`
`,t(m,{get children(){return t(E,{children:"No records found"})}}),`
`,t(g,{get children(){return t(e.pre,{get children(){return t(e.code,{className:"language-tsx",children:`<EmptyResult>No records found</EmptyResult>
`})}})}}),`
`,t(e.h2,{children:"Properties"}),`
`,t(e.p,{get children(){return[t(e.code,{children:"EmptyResult"})," has no special properties, it acts like a ",t(y,{children:"div"})," element."]}})]}function M(r={}){const{wrapper:e}=Object.assign({},o(),r.components);return e?t(e,a(r,{get children(){return t(s,r)}})):s(r)}export{M as default};
