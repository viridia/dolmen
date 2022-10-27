# Dolmen

Dolmen is a themeable UI component library designed to work with Solid.js and optimized for SSR
(Server-side rendering). It provides a broad selection of UI components with minimal overhead.

## Themes

Themes are implemented using CSS variables. Once a theme has been defined, you can add the
theme's class name to any element, and it will affect all descendants of that element.

Multiple themes are supported, so you can have (for example) a sidebar with a different color
scheme than the main page.

## Limitations of SSR

An important consideration when rendering HTML on the server is avoiding the ugly "Flash of
Unstyled Content" (FOUC) when the HTML is displayed before the CSS is loaded. This requires that
all of the CSS needs to be server-side renderable.

Dolmen uses the [Stitches](https://stitches.dev//) package to generate CSS stylesheets from
JavaScript on the server as well as on the client.

One limitation of this approach is that the server-generated CSS is not quite as dynamic as CSS
that is generated on the client. With client-side CSS-in-JS it is possible to create styles
algorithmically, but with pregenerated CSS this can cause a combinatorial explosion of stylesheets
unless care is taken to limit the number of combinations.

Dolmen provides *some* of the benefits of dynamic styling by cherry-picking the most common and
useful style combinations and incorporating them into the component APIs, similar to
what [styled-system](https://styled-system.com/) does. Here's an example:

```tsx
<PageHeader gap="xs" flexDirection="row">
  <Button icon round>Sign In</Button>
</PageHeader>
```

However, what you can't do is something like this:

```tsx
<PageHeader gap="10px">
  <Button icon round>Sign In</Button>
</PageHeader>
```

The reason is because the value `10px` is not in the selected set of known gap sizes.

To get around this limitation, the component can be styled in the traditional way, by
applying a conventional stylesheet:

```tsx
<PageHeader class="page-header">
  <Button icon round>Sign In</Button>
</PageHeader>
```

```css
// Stylesheet
.page-header {
  gap: 10px;
}
```

Dolmen does not put any restriction on what kind of stylesheets you use - it will work with
[SASS](https://sass-lang.com/), [vanilla-extract](https://vanilla-extract.style/),
[Tailwind](https://tailwindcss.com/), or any other CSS technology out there. You can also use
CSS-in-JS frameworks if you want, bearing in mind that you may be subject to FOUC issues unless
you have a means to generate the stylesheet at build time.

Bottom line, what this means is that when using the styling properties in the component APIs, one
should not expect that every possible CSS property will be available, but rather only the most
popular ones. Since these style properties are all known TypeScript types, auto-complete in your
editor can help you to discover which properties are available and what their allowed values are.