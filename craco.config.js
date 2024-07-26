const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring 참고
  // 해당 부분은 방법이 떠오르지 않아 구글링을 통해 해결하였습니다.
  jest: {
    configure: {
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        // https://stackoverflow.com/questions/73958968/cannot-use-import-statement-outside-a-module-with-axios #23 답변
        "^axios$": "axios/dist/node/axios.cjs",
      },},
  },
};
