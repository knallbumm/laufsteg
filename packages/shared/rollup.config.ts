import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';

const iifeName = 'Laufsteg';

export default [
  defineConfig({
    input: 'index.ts',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'es',
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
    ],
    external: [], // TODO maybe use something like @manypkg/get-packages
    plugins: [
      postcss({
        extensions: ['.css'],
      }),
      esbuild(),
    ],
  }),
  defineConfig({
    input: 'index.ts',
    output: [
      {
        file: 'dist/index.iife.min.js',
        format: 'iife',
        name: iifeName,
        extend: true,
        globals: {},
      },
    ],
    plugins: [
      postcss({
        extensions: ['.css'],
      }),
      esbuild({
        minify: true,
      }),
      commonjs({}),
      nodeResolve(),
    ],
  }),
  defineConfig({
    input: 'index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [
      postcss({
        extensions: ['.css'],
      }),
      dts({}),
    ],
  }),
];
