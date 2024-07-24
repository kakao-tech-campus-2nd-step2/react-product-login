/// <reference types="vitest" />
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react'
  }), tsconfigPaths()],

  test: {
    globals: true,
    environment: 'jsdom'
  }
} as UserConfig);