const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */,
    },
    configure: { /* ... */ },
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      jestConfig.moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        '^axios$': 'axios/dist/node/axios.cjs',
      };
      
      return jestConfig;
    },
  },
};
