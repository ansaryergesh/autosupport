import path from 'path';

const srcPath = path.resolve('src');
const nodeModulesPath = path.resolve('node_modules');

export default function css() {

  return {
    modules: {
      localsConvention: 'camelCase',
    },
    exportGlobals: true,
    resolve: {
      alias: [
        {
          find: /^@\/|^@~|^~@/,
          replacement: `${srcPath}/`,
        },
        {
          find: /^~\/|^~/,
          replacement: `${nodeModulesPath}/`,
        },
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': 'linear-gradient(98deg, rgba(153,166,249,0.7820378151260504) 0%, rgba(28,204,158,0.6027661064425771) 26%, rgba(27,216,137,0.375875350140056) 51%, rgba(26,226,118,0.644782913165266) 74%, rgba(128,255,97,0.8576680672268908) 100%);',
        },
      },
    },
  };
}
