import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    plugins: [dts()],
    build: {
      minify: mode !== 'dev',
      lib: {
        entry: path.resolve(__dirname, './src/index.ts'),
        fileName: (format) => 'index.js',
        formats: ['es'],
      },
      rollupOptions: {
        external: ['react', 'recoil'],
        output: {
          globals: {
            react: 'React',
          },
        },
      },
    },
  };
});
