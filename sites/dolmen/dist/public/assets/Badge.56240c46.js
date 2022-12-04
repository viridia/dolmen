import{s as K,g as R,b as Q,m as X,r as U,t as q,c as t,i as g}from"./entry-client.0e18877c.js";import{M as A}from"./index.851bda99.js";import{T as u}from"./SplitPane.abdc1c79.js";import{G as _}from"./Group.e2a1de10.js";import{D as z,S as N,a as W}from"./mdx.00edb165.js";var Y={grad:.9,turn:360,rad:360/(2*Math.PI)},f=function(n){return typeof n=="string"?n.length>0:typeof n=="number"},c=function(n,e,r){return e===void 0&&(e=0),r===void 0&&(r=Math.pow(10,e)),Math.round(r*n)/r+0},h=function(n,e,r){return e===void 0&&(e=0),r===void 0&&(r=1),n>r?r:n>e?n:e},F=function(n){return(n=isFinite(n)?n%360:0)>0?n:n+360},T=function(n){return{r:h(n.r,0,255),g:h(n.g,0,255),b:h(n.b,0,255),a:h(n.a)}},C=function(n){return{r:c(n.r),g:c(n.g),b:c(n.b),a:c(n.a,3)}},Z=/^#([0-9a-f]{3,8})$/i,B=function(n){var e=n.toString(16);return e.length<2?"0"+e:e},V=function(n){var e=n.r,r=n.g,i=n.b,o=n.a,l=Math.max(e,r,i),a=l-Math.min(e,r,i),s=a?l===e?(r-i)/a:l===r?2+(i-e)/a:4+(e-r)/a:0;return{h:60*(s<0?s+6:s),s:l?a/l*100:0,v:l/255*100,a:o}},J=function(n){var e=n.h,r=n.s,i=n.v,o=n.a;e=e/360*6,r/=100,i/=100;var l=Math.floor(e),a=i*(1-r),s=i*(1-(e-l)*r),m=i*(1-(1-e+l)*r),p=l%6;return{r:255*[i,s,a,a,m,i][p],g:255*[m,i,i,s,a,a][p],b:255*[a,a,m,i,i,s][p],a:o}},H=function(n){return{h:F(n.h),s:h(n.s,0,100),l:h(n.l,0,100),a:h(n.a)}},j=function(n){return{h:c(n.h),s:c(n.s),l:c(n.l),a:c(n.a,3)}},k=function(n){return J((r=(e=n).s,{h:e.h,s:(r*=((i=e.l)<50?i:100-i)/100)>0?2*r/(i+r)*100:0,v:i+r,a:e.a}));var e,r,i},v=function(n){return{h:(e=V(n)).h,s:(o=(200-(r=e.s))*(i=e.v)/100)>0&&o<200?r*i/100/(o<=100?o:200-o)*100:0,l:o/2,a:e.a};var e,r,i,o},ee=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,ne=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,re=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,te=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,L={string:[[function(n){var e=Z.exec(n);return e?(n=e[1]).length<=4?{r:parseInt(n[0]+n[0],16),g:parseInt(n[1]+n[1],16),b:parseInt(n[2]+n[2],16),a:n.length===4?c(parseInt(n[3]+n[3],16)/255,2):1}:n.length===6||n.length===8?{r:parseInt(n.substr(0,2),16),g:parseInt(n.substr(2,2),16),b:parseInt(n.substr(4,2),16),a:n.length===8?c(parseInt(n.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(n){var e=re.exec(n)||te.exec(n);return e?e[2]!==e[4]||e[4]!==e[6]?null:T({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):null},"rgb"],[function(n){var e=ee.exec(n)||ne.exec(n);if(!e)return null;var r,i,o=H({h:(r=e[1],i=e[2],i===void 0&&(i="deg"),Number(r)*(Y[i]||1)),s:Number(e[3]),l:Number(e[4]),a:e[5]===void 0?1:Number(e[5])/(e[6]?100:1)});return k(o)},"hsl"]],object:[[function(n){var e=n.r,r=n.g,i=n.b,o=n.a,l=o===void 0?1:o;return f(e)&&f(r)&&f(i)?T({r:Number(e),g:Number(r),b:Number(i),a:Number(l)}):null},"rgb"],[function(n){var e=n.h,r=n.s,i=n.l,o=n.a,l=o===void 0?1:o;if(!f(e)||!f(r)||!f(i))return null;var a=H({h:Number(e),s:Number(r),l:Number(i),a:Number(l)});return k(a)},"hsl"],[function(n){var e=n.h,r=n.s,i=n.v,o=n.a,l=o===void 0?1:o;if(!f(e)||!f(r)||!f(i))return null;var a=function(s){return{h:F(s.h),s:h(s.s,0,100),v:h(s.v,0,100),a:h(s.a)}}({h:Number(e),s:Number(r),v:Number(i),a:Number(l)});return J(a)},"hsv"]]},D=function(n,e){for(var r=0;r<e.length;r++){var i=e[r][0](n);if(i)return[i,e[r][1]]}return[null,void 0]},ie=function(n){return typeof n=="string"?D(n.trim(),L.string):typeof n=="object"&&n!==null?D(n,L.object):[null,void 0]},w=function(n,e){var r=v(n);return{h:r.h,s:h(r.s+100*e,0,100),l:r.l,a:r.a}},M=function(n){return(299*n.r+587*n.g+114*n.b)/1e3/255},E=function(n,e){var r=v(n);return{h:r.h,s:r.s,l:h(r.l+100*e,0,100),a:r.a}},P=function(){function n(e){this.parsed=ie(e)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return n.prototype.isValid=function(){return this.parsed!==null},n.prototype.brightness=function(){return c(M(this.rgba),2)},n.prototype.isDark=function(){return M(this.rgba)<.5},n.prototype.isLight=function(){return M(this.rgba)>=.5},n.prototype.toHex=function(){return e=C(this.rgba),r=e.r,i=e.g,o=e.b,a=(l=e.a)<1?B(c(255*l)):"","#"+B(r)+B(i)+B(o)+a;var e,r,i,o,l,a},n.prototype.toRgb=function(){return C(this.rgba)},n.prototype.toRgbString=function(){return e=C(this.rgba),r=e.r,i=e.g,o=e.b,(l=e.a)<1?"rgba("+r+", "+i+", "+o+", "+l+")":"rgb("+r+", "+i+", "+o+")";var e,r,i,o,l},n.prototype.toHsl=function(){return j(v(this.rgba))},n.prototype.toHslString=function(){return e=j(v(this.rgba)),r=e.h,i=e.s,o=e.l,(l=e.a)<1?"hsla("+r+", "+i+"%, "+o+"%, "+l+")":"hsl("+r+", "+i+"%, "+o+"%)";var e,r,i,o,l},n.prototype.toHsv=function(){return e=V(this.rgba),{h:c(e.h),s:c(e.s),v:c(e.v),a:c(e.a,3)};var e},n.prototype.invert=function(){return b({r:255-(e=this.rgba).r,g:255-e.g,b:255-e.b,a:e.a});var e},n.prototype.saturate=function(e){return e===void 0&&(e=.1),b(w(this.rgba,e))},n.prototype.desaturate=function(e){return e===void 0&&(e=.1),b(w(this.rgba,-e))},n.prototype.grayscale=function(){return b(w(this.rgba,-1))},n.prototype.lighten=function(e){return e===void 0&&(e=.1),b(E(this.rgba,e))},n.prototype.darken=function(e){return e===void 0&&(e=.1),b(E(this.rgba,-e))},n.prototype.rotate=function(e){return e===void 0&&(e=15),this.hue(this.hue()+e)},n.prototype.alpha=function(e){return typeof e=="number"?b({r:(r=this.rgba).r,g:r.g,b:r.b,a:e}):c(this.rgba.a,3);var r},n.prototype.hue=function(e){var r=v(this.rgba);return typeof e=="number"?b({h:e,s:r.s,l:r.l,a:r.a}):c(r.h)},n.prototype.isEqual=function(e){return this.toHex()===b(e).toHex()},n}(),b=function(n){return n instanceof P?n:new P(n)};const oe=q("<div></div>"),d=n=>{const[e,r]=K(n,["color","size","radius","class","classList"]),o=b(e.color??"#888888").isLight()?"#000":"#fff";return(()=>{const l=R(oe);return Q(l,X(r,{get style(){return{"background-color":e.color,color:o}},get classList(){return{...e.classList,[e.class]:!!e.class,"dm-badge":!0,[`dm-size-${e.size}`]:Boolean(e.size),[`dm-radius-${e.radius}`]:Boolean(e.radius)}}}),!1,!1),U(),l})()},G=q(`<ul><li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li></ul>`);function O(n){const e=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre"},A(),n.components);return u||I("Table",!1),u.Cell||I("Table.Cell",!0),u.Row||I("Table.Row",!0),[t(e.h1,{children:"Badge"}),`
`,t(e.p,{get children(){return["A ",t(e.code,{children:"Badge"})," is used to indicate that a group of buttons are related or part of a set."]}}),`
`,t(e.h2,{children:"Badge Colors"}),`
`,t(e.p,{get children(){return["The ",t(e.code,{children:"color"})," property of a ",t(e.code,{children:"Badge"}),` can be set to any CSS color expression. The component
automatically selects a high-contrast text color to go with the specified fill color.`]}}),`
`,t(z,{get children(){return t(_,{gap:"md",get children(){return[t(d,{color:"#4400cc",children:"we"}),`
`,t(d,{color:"#6622cc",children:"don't"}),`
`,t(d,{color:"#8844cc",children:"need"}),`
`,t(d,{color:"#cc66cc",children:"no"}),`
`,t(d,{color:"#ee88cc",children:"stinkin'"}),`
`,t(d,{color:"#ffaacc",children:"badges!"})]}})}}),`
`,t(N,{get children(){return t(e.pre,{get children(){return t(e.code,{className:"language-tsx",children:`<>
  <Badge color="#4400cc">we</Badge>
  <Badge color="#6622cc">don't</Badge>
  <Badge color="#8844cc">need</Badge>
  <Badge color="#cc66cc">no</Badge>
  <Badge color="#ee88cc">stinkin'</Badge>
  <Badge color="#ffaacc">badges!</Badge>
</>
`})}})}}),`
`,t(e.h2,{children:"Badge Sizes"}),`
`,t(z,{get children(){return t(_,{gap:"md",get children(){return[t(d,{size:"xl",color:"#4400cc",children:"size = xl"}),`
`,t(d,{size:"lg",color:"#880088",children:"size = lg"}),`
`,t(d,{size:"md",color:"#880066",children:"size = md"}),`
`,t(d,{size:"sm",color:"#cc0044",children:"size = sm"}),`
`,t(d,{size:"xs",color:"#ff0000",children:"size = xs"})]}})}}),`
`,t(N,{get children(){return t(e.pre,{get children(){return t(e.code,{className:"language-tsx",children:`<>
  <Badge size="xl" color="#4400cc">size = xl</Badge>
  <Badge size="lg" color="#880088">size = lg</Badge>
  <Badge size="md" color="#880066">size = md</Badge>
  <Badge size="sm" color="#cc0044">size = sm</Badge>
  <Badge size="xs" color="#ff0000">size = xs</Badge>
</>
`})}})}}),`
`,t(e.h2,{children:"Badge Radius"}),`
`,t(e.p,{get children(){return["The ",t(e.code,{children:"radius"})," property determines the roundness of the badge corners. Setting the radius to ",t(e.code,{children:"xl"}),`
converts the badge into a pill shape.`]}}),`
`,t(z,{get children(){return t(_,{gap:"md",get children(){return[t(d,{radius:"xs",color:"#00ff88",children:"radius = xs"}),`
`,t(d,{radius:"sm",color:"#00cc88",children:"radius = sm"}),`
`,t(d,{radius:"md",color:"#008888",children:"radius = md"}),`
`,t(d,{radius:"lg",color:"#004488",children:"radius = lg"}),`
`,t(d,{radius:"xl",color:"#0044cc",children:"radius = xl"})]}})}}),`
`,t(N,{get children(){return t(e.pre,{get children(){return t(e.code,{className:"language-tsx",children:`<>
  <Badge radius="xs" color="#00ff88">radius = xs</Badge>
  <Badge radius="sm" color="#00cc88">radius = sm</Badge>
  <Badge radius="md" color="#008888">radius = md</Badge>
  <Badge radius="lg" color="#004488">radius = lg</Badge>
  <Badge radius="xl" color="#0044cc">radius = xl</Badge>
</>
`})}})}}),`
`,t(e.h2,{children:"Badge properties"}),`
`,t(W,{get children(){return[t(u.Row,{get children(){return[t(u.Cell,{children:"color"}),`
`,t(u.Cell,{children:"Color of the badge"}),t(u.Cell,{get children(){return t(e.p,{children:"CSS color expression"})}})]}}),t(u.Row,{get children(){return[t(u.Cell,{children:"size"}),`
`,t(u.Cell,{children:"Badge size"}),t(u.Cell,{get children(){const r=R(G),i=r.firstChild,o=i.nextSibling,l=o.nextSibling,a=l.nextSibling,s=a.nextSibling,m=s.nextSibling,p=m.nextSibling,y=p.nextSibling,x=y.nextSibling,$=x.nextSibling,S=$.nextSibling;return g(i,t(e.code,{children:"xl"})),g(l,t(e.code,{children:"lg"})),g(s,t(e.code,{children:"md"})),g(p,t(e.code,{children:"sm"})),g(x,t(e.code,{children:"xl"})),g(S,t(e.code,{children:"xs"})),r}})]}}),t(u.Row,{get children(){return[t(u.Cell,{children:"radius"}),t(u.Cell,{get children(){return t(e.p,{children:"Indicates how 'rounded' the badge should appear,"})}}),t(u.Cell,{get children(){const r=R(G),i=r.firstChild,o=i.nextSibling,l=o.nextSibling,a=l.nextSibling,s=a.nextSibling,m=s.nextSibling,p=m.nextSibling,y=p.nextSibling,x=y.nextSibling,$=x.nextSibling,S=$.nextSibling;return g(i,t(e.code,{children:"xl"})),g(l,t(e.code,{children:"lg"})),g(s,t(e.code,{children:"md"})),g(p,t(e.code,{children:"sm"})),g(x,t(e.code,{children:"xl"})),g(S,t(e.code,{children:"xs"})),r}})]}})]}}),`
`,t(e.p,{get children(){return[t(e.code,{children:"Badge"})," also accepts all of the standard attributes for a ",t(e.code,{children:"div"})," element."]}})]}function ue(n={}){const{wrapper:e}=Object.assign({},A(),n.components);return e?t(e,X(n,{get children(){return t(O,n)}})):O(n)}function I(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{ue as default};
