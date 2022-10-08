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
      extensions: ['.mdx', '.md'],
    }),
  ],
  resolve: {
    alias: {
      dolmen: path.resolve(__dirname, './packages/dolmen/src'),
      'dolmen/*': path.resolve(__dirname, './packages/dolmen/src/*'),
    },
  },
});
