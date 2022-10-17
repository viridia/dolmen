import path from 'path';
import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [
    vanillaExtractPlugin({
      // identifiers: "short",
    }),
    solid({
      // clientEntry: './packages/solid-codex/src/entry-client.tsx',
      // serverEntry: './packages/solid-codex/src/entry-server.tsx',
      // extensions: ['.mdx', '.md'],
    }),
  ],
  // optimizeDeps: {
  //   exclude: [path.resolve(__dirname, './packages/dolmen/dist/')],
  // },
  resolve: {
    alias: {
      'dolmen/fixtures': path.resolve(__dirname, './packages/dolmen/src/fixtures'),
      'dolmen/fixtures/*': path.resolve(__dirname, './packages/dolmen/src/fixtures/*'),
    },
  },
});
