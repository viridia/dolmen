import{M as a}from"./index.851bda99.js";import{H as i}from"./mdx.00edb165.js";import{c as t,m as s}from"./entry-client.0e18877c.js";import"./SplitPane.abdc1c79.js";function o(n){const e=Object.assign({h1:"h1",p:"p",h2:"h2",a:"a",em:"em",code:"code"},a(),n.components);return[t(e.h1,{children:"Dolmen Design Philosophy"}),`
`,t(e.p,{children:`Dolmen is intended to be a UI component library that is both lightweight and easy to use.
Unfortunate, these goals sometimes come into conflict, so the next section will describe
some of the design trade-offs that have shaped the library.`}),`
`,t(e.h2,{children:"Styling and CSS"}),`
`,t(e.p,{children:`One of the most important goals of Dolmen is that it be able to load quickly, without the
dreaded "Flash of Unstyled Content" (FOUC) that is the bane of server-side rendering. This means
that stylesheets need to be loaded up-front, before the body of the page is rendered by the
browser.`}),`
`,t(e.p,{get children(){return[`Early versions of Dolmen experimented with a number of different CSS-in-JS frameworks, using
both ahead-of-time stylesheet compilation (such as
`,t(e.a,{href:"https://vanilla-extract.style/",children:"vanilla-extract"}),`) and dynamic generation of styles
(as seen in libraries like `,t(e.a,{href:"https://emotion.sh/",children:"Emotion"})," or ",t(e.a,{href:"https://stitches.dev/",children:"Stitches"}),`).
Unfortunately, there are drawbacks to either
of these approaches in an SSR context: either you end up importing a lot of CSS that you don't
actully need or want (because CSS is not tree-shakeable), or you have to generate the whole page
synchronously so that the dynamically-computed styles can go in the page `,t(i,{children:"head"}),"."]}}),`
`,t(e.p,{children:`The solution that was eventually adopted was to revert back to the "old" way of doing CSS: using
SASS. Because of the problems involved with import side-effects (basically, all bundlers treat
CSS imports as side-effectful, which means that the styles get included even if the module importing
those styles is dead-code eliminated), Dolmen does not automatically import any stylesheets, and
leaves it up to the application developer to import the styles that they need. If you just want to
import everything, there's a simple way to do it, or you can import styles for individual
components if you want to be more parsimonious.`}),`
`,t(e.p,{children:`This means a slightly-less-than-ideal developer experience, but what you get in exchange is a better
end-user experience. And adding a few extra import lines is not that difficult for a developer.`}),`
`,t(e.p,{get children(){return[`Also, the author of an application using Dolmen is in no way restricted to making the same set of
technical styling choices as Dolmen itself. The tradeoff calculation for an application is very
different than that of a library - most apps only use a portion of the functionality of
a library, which means that the library contains a lot of things that the app will never use,
and `,t(e.em,{children:"should not have to pay for"}),`. An app, on the other hand, presumably only contains things
that it actually needs.`]}}),`
`,t(e.p,{get children(){return[`Thus, if you decide that you want to base your app on
`,t(e.a,{href:"https://vanilla-extract.style/",children:"vanilla-extract"}),", ",t(e.a,{href:"https://linaria.dev/",children:"linaria"}),`,
`,t(e.a,{href:"https://github.com/cristianbote/goober",children:"goober"}),`, or any
other styling solution - more power to you! Dolmen will mesh with those frameworks just fine,
since it's all just CSS in the end. All Dolmen widgets correctly pass-through the Solid.js
`,t(e.code,{children:"class"})," and ",t(e.code,{children:"classList"})," attributes, and merge them with their own internal styles."]}}),`
`,t(e.p,{get children(){return[`Additionally, all Dolmen classes are defined within a set of
`,t(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/@layer",children:"CSS layers"})," which are ",t(e.em,{children:"lower priority"}),`
than the default CSS scope. This means that any application-supplied style rules will automatically
take precedence over any Dolmen styles.`]}}),`
`,t(e.h2,{children:"Flexibility vs. Size"}),`
`,t(e.p,{children:`Another trade-off that Dolmen makes is that it tries to be somewhat minimal in terms of options
and choices - that is to say, the library is fairly opinionated. For example, whereas many popular
UI component libraries offer a choice of a dozen different button colors, Dolmen only provides four.
That being said, it is relatively easy, using Dolmen's design tokens, to create a custom button
with its own color scheme if you really need it.`}),`
`,t(e.p,{get children(){return[`In a similar vein, Dolmen offers a limited form of "utility styling" inspired by
`,t(e.a,{href:"https://tailwindcss.com/",children:"Tailwind"}),`, although
it more closely resembles the type-safe approach pioneered by
`,t(e.a,{href:"https://styled-system.com/",children:"styled-system"}),`. But it only exposes
these utility styles in places where they are most likely to be used, which is on the layout-oriented
components. And the set of style properties that are offered is a carefully-curated collection,
including only the style properties that appear most often in layouts. Thus, `,t(e.code,{children:"gap"}),` is offered
as an easy way to put some spacing between elements, because that happens a lot; Wherease something
more exotic like `,t(e.code,{children:"text-decoration"})," must be styled the traditional way, using a CSS class."]}}),`
`,t(e.p,{children:`These design choices are motivated by a desire to reduce the download size of the Dolmen CSS to
something reasonable. The small number of choices offered means that we can get away with having
only about three dozen CSS variables, and only about four dozen utility style classes.`})]}function c(n={}){const{wrapper:e}=Object.assign({},a(),n.components);return e?t(e,s(n,{get children(){return t(o,n)}})):o(n)}export{c as default};
