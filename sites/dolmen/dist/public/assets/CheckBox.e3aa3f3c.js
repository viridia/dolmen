import{M as m}from"./index.afa9dd74.js";import"./SplitPane.75581b8f.js";import{s as g,g as C,h as v,b as y,m as k,i as _,j as w,q as $,p as S,r as B,t as M,c as e,e as i}from"./entry-client.0af9de6f.js";import{D as l,S as d,P as T,a as L}from"./mdx.1370b2ae.js";const P=M("<label><input><!#><!/></label>"),h=n=>{const[t,a]=g(n,["class","classList","children","ref"]);return(()=>{const c=C(P),s=c.firstChild,b=s.nextSibling,[p,x]=v(b.nextSibling);return y(s,k(a,{class:"dm-checkbox-ctrl",type:"checkbox"}),!1,!1),_(c,()=>t.children,p,x),w(r=>{const o=n.disabled??void 0,f={...t.classList,[t.class]:!!t.class,"dm-checkbox-label":!0};return o!==r._v$&&$(c,"aria-disabled",r._v$=o),r._v$2=S(c,f,r._v$2),r},{_v$:void 0,_v$2:void 0}),B(),c})()};function u(n){const t=Object.assign({h1:"h1",p:"p",pre:"pre",code:"code",h3:"h3",h2:"h2"},m(),n.components);return[e(t.h1,{children:"CheckBox"}),`
`,e(t.p,{children:"Checkboxes can be used to turn an option on or off."}),`
`,e(l,{children:()=>{const[a,c]=i(!1);return e(h,{get checked(){return a()},onClick:()=>c(s=>!s),children:"I like Chocolate!"})}}),`
`,e(d,{get children(){return e(t.pre,{get children(){return e(t.code,{className:"language-tsx",children:`const [checked, setChecked] = createSignal(false); return{' '}
<CheckBox checked={checked()} onClick={() => setChecked(v => !v)} >
  I like Chocolate!
</CheckBox>
`})}})}}),`
`,e(t.h3,{children:"Indeterminate state"}),`
`,e(t.p,{children:`The "indeterminate" attribute is used to indicate a checkbox is neither checked or unchecked.
This is typically used in cases where you have a table of selectable rows, each with its own
checkbox, and a single "summary" checkbox that can be used to select or deselect the entire
list at once. The summary checkbox should be displayed as checked when all rows are selected,
unchecked when none of the rows are selected, and indeterminate when only some of the rows
are selected.`}),`
`,e(l,{children:()=>(i(!1),e(h,{indeterminate:!0,children:"Some items selected"}))}),`
`,e(d,{get children(){return e(t.pre,{get children(){return e(t.code,{className:"language-tsx",children:`<CheckBox indeterminate >
  Some items selected
</CheckBox>
`})}})}}),`
`,e(t.h2,{children:"CheckBox properties"}),`
`,e(t.p,{children:`Checkboxes accept all of the standard properties for an HTML checkbox element. The only additional
attribute is the "indeterminate" option:`}),`
`,e(L,{get children(){return e(T,{name:"indeterminate",description:"Render the checkbox in an 'indeterminate' state.",type:"boolean"})}})]}function E(n={}){const{wrapper:t}=Object.assign({},m(),n.components);return t?e(t,k(n,{get children(){return e(u,n)}})):u(n)}export{E as default};
