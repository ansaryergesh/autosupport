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
          'primary-color': 'linear-gradient(90deg, #6F95E3 0%, #5DA1D3 15.63%, #4EABC7 33.85%, #38B9B5 47.40%, #23C7A4 61.46%, #1CCE9A 79.17%, #1BD788 100%)',
        },
      },
    },
  };
}
