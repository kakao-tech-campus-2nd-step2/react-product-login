module.exports = {
    presets: [
      '@babel/preset-env', // 최신 JavaScript 문법을 지원
      '@babel/preset-react', // React JSX 문법을 지원
      '@babel/preset-typescript' // TypeScript 문법을 지원
    ],
    plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          '@': './src', // '@'를 'src'로 매핑
        },
      }],
    ],
  };
  