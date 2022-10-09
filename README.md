# Dolmen

Dolmen is a themeable UI component library designed to work with Solid.js and optimized for SSR
(Server-side rendering). It provides a broad selection of UI components with minimal overhead.

## Limitations of SSR

An important consideration when rendering HTML on the server is avoiding the ugly "Flash of
Unstyled Content" (FOUC) when the HTML is displayed before the CSS is loaded. This requires that
all of the CSS needs to be statically generated ahead of time, rather than generated in JavaScript.
This means that many of the popular CSS-in-JS frameworks, such as [emotion](https://emotion.sh/) or
[styled-components](https://styled-components.com/) cannot be used.

Instead, Dolmen uses the [vanilla-extract](https://vanilla-extract.style/) package to generate
CSS from JavaScript at build time. This is consistent with Dolmen's goal of being a
framework with minimal overhead.

One limitation of this approach is that the pregenerated CSS is not quite as dynamic as CSS
that is generated on the client. With CSS-in-JS it is possible to create styles algorithmically,
but with pregenerated CSS this can cause a combinatorial explosion of stylesheets unless care is
taken to limit the number of combinations.

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

In general, this means that when using the styling properties in the component API, one should
not expect that every possible CSS property will be available, but rather only the most popular
ones. Since these style properties are all known TypeScript types, auto-complete in your editor
can help you to discover which properties are available and what their allowed values are.

Dolmen does not put any restriction on what kind of stylesheets you use - it will work with
[SASS](https://sass-lang.com/), [vanilla-extract](https://vanilla-extract.style/),
[Tailwind](https://tailwindcss.com/), or any other CSS technology out there. You can also use
CSS-in-JS frameworks if you want, bearing in mind that you may be subject to FOUC issues unless
you have a means to generate the stylesheet at build time.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `node build`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.
