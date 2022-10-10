import withSolid from 'rollup-preset-solid';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';

export default withSolid([
  {
    input: 'src/index.ts',
    plugins: [vanillaExtractPlugin()],
    mappingName: 'mjs',
    output: {
      file: './dist/index.mjs',
      format: 'module',
    },
  },
  {
    input: 'src/index.ts',
    plugins: [vanillaExtractPlugin()],
    mappingName: 'cjs',
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
