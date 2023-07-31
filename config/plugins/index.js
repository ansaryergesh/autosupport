import { nodeResolve } from '@rollup/plugin-node-resolve';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import i18nextLoader from 'vite-plugin-i18next-loader';
import svgr from 'vite-plugin-svgr';
import watchLocales from './watchLocales';
import { reactClickToComponent } from 'vite-plugin-react-click-to-component';
import eslint from 'vite-plugin-eslint';

const common = [
  nodeResolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs', '.cjs', '.node'],
  }),
  viteTsconfigPaths(),
  i18nextLoader({
    paths: ['./src/locales'],
    namespaceResolution: 'basename',
  }),
  svgr({
    exportAsDefault: false,
    include: "**/*.svg",
  }),
]

const dev = [
  watchLocales(),
  eslint({
    include: ['src/**/*.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    cache: false,
    overrideConfig: {
      rules: {
        'react/prop-types': 'off',
        "no-unused-vars": ["error", { "varsIgnorePattern": "React" }]
      }
    }
  }),
  reactClickToComponent(),
];

const prod = [];

export default {
  common,
  dev,
  prod,
};

