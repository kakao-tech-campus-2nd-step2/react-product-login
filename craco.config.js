const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@internalTypes': path.resolve(__dirname, 'src/types'),
      '@apis': path.resolve(__dirname, 'src/apis'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^axios$': 'axios/dist/node/axios.cjs',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@apis/(.*)$': '<rootDir>/src/apis/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@context/(.*)$': '<rootDir>/src/context/$1',
        '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@routes/(.*)$': '<rootDir>/src/routes/$1',
        '^@types/(.*)$': '<rootDir>/src/types/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
      },
    },
  },
};
