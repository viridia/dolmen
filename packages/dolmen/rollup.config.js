import withSolid from 'rollup-preset-solid';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
// import dts from "rollup-plugin-dts";

export default withSolid([
  {
    input: 'src/index.ts',
    plugins: [vanillaExtractPlugin()],
    mappingName: 'lib',
    output: {
      file: './dist/index.mjs',
      format: 'module',
    },
  },
  {
    input: 'src/index.ts',
    plugins: [vanillaExtractPlugin()],
    mappingName: 'lib',
    solidOptions: {
      generate: 'ssr',
      hydratable: false,
    },
    targets: ['cjs'],
    output: {
      file: './dist/index.cjs',
      format: 'cjs',
    },
  },
]);
