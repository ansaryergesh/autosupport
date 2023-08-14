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
          'primary-color': 'linear-gradient(90deg, #00F260 0%, #04D4C8 100%)',
        },
      },
    },
  };
}
