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
      // Root directory for fixture files, used by glob import.
      // This doesn't handle multiple roots,
      // '#fixtures': path.resolve(__dirname, './packages/dolmen/src/fixtures'),

      // Aliases used during development
      // Mainly here because I can't seem to get TypeScript project references to work.
      // 'dolmen': path.resolve(__dirname, './packages/dolmen/src'),
      'dolmen-gizmos': path.resolve(__dirname, './packages/dolmen-gizmos/src'),
      'dolmen-keys': path.resolve(__dirname, './packages/dolmen-keys/src'),
      'dolmen-rich-text': path.resolve(__dirname, './packages/dolmen-rich-text/src'),
      'solid-codex': path.resolve(__dirname, './packages/solid-codex/src'),
      'solid-codex-api': path.resolve(__dirname, './packages/solid-codex-api/src'),
    },
  },
});
