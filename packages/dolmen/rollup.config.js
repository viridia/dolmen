import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import jsx from 'acorn-jsx';
import pkg from './package.json';
// import renameExtensions from '@betit/rollup-plugin-rename-extensions';

const extensions = ['.js', '.ts', '.jsx', '.tsx'];
const babelTargets = 'last 2 years';

// Fix icons
// Fix unused warnings

const plugins = [
  // renameExtensions({
  //   include: ['**/*.tsx'],
  //   mappings: {
  //     '.tsx': '.jsx',
  //   },
  // }),
  vanillaExtractPlugin({
    identifiers: 'short',
  }),
  babel({
    extensions,
    babelHelpers: 'bundled',
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-env', { bugfixes: true, targets: babelTargets }],
    ],
    exclude: 'node_modules/**',
  }),
  nodeResolve({ extensions }),
];

const entryPoints = [
  'src/index.tsx',
//   'src/components/core/Button.tsx',
//   'src/components/core/ButtonGroup.tsx',
//   'src/components/core/DiscloseButton.tsx',
//   'src/components/core/Knob.tsx',
//   'src/components/core/Modal.tsx',
//   'src/components/form/CheckBox.tsx',
//   'src/components/form/FieldValidation.tsx',
//   'src/components/form/Input.tsx',
//   'src/components/form/ToggleSwitch.tsx',
//   'src/components/layout/Aside.tsx',
//   'src/components/layout/Card.tsx',
//   'src/components/layout/Drawer.tsx',
//   'src/components/layout/Group.tsx',
//   'src/components/layout/Page.tsx',
//   'src/components/layout/PageHeader.tsx',
//   'src/components/layout/Spacer.tsx',
//   'src/components/layout/SplitPane.tsx',
//   'src/components/layout/Stack.tsx',
//   'src/components/text/Code.tsx',
//   'src/components/text/Text.tsx',
//   'src/components/text/Title.tsx',
//   'src/hooks/index.ts',
//   'src/icons/index.ts',
]

export default [
  {
    input: entryPoints,
    external: Object.keys(pkg.dependencies),
    acornInjectPlugins: [jsx()],
    plugins: [
      ...plugins,
      typescript({
        tsconfig: './tsconfig.build.json',
        outDir: './dist/mjs',
      }),
    ],

    output: {
      dir: './dist/mjs',
      format: 'module',
      // preserveModules: true,
      // preserveModulesRoot: './src',
      assetFileNames({ name }) {
        return name?.replace(/^src\//, '') ?? '';
      },
    },
  },
  {
    input: entryPoints,
    external: Object.keys(pkg.dependencies),
    acornInjectPlugins: [jsx()],
    plugins: [
      ...plugins,
      typescript({
        tsconfig: './tsconfig.build.json',
        outDir: './dist/cjs',
      }),
    ],

    output: {
      dir: './dist/cjs',
      format: 'cjs',
      // preserveModules: true,
      // preserveModulesRoot: './src',

      assetFileNames({ name }) {
        return name?.replace(/^src\//, '') ?? '';
      },
    },
  },
];
