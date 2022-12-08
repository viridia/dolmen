import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import staticAdapter from 'solid-start-static';

export default defineConfig({
  // base: '/dolmen/',
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
      }),
      enforce: 'pre',
    },
    solid({
      extensions: ['.mdx', '.md'],
      adapter: staticAdapter(),
      // ssr: false,
    }),
  ],
  css: {
    devSourcemap: true,
  },
  build: {
    minify: false,
  }
});
