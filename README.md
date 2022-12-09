# Dolmen

Dolmen is a themeable UI component library designed to work with Solid.js and optimized for SSR
(Server-side rendering). It provides a broad selection of UI components with minimal overhead.

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
