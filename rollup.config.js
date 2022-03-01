import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const formatName = 'TG';
const isProd = process.env.NODE_ENV === 'production';
const minPkg = {
  main: 'lib/tg-tools.cjs.min.js',
  module: 'lib/tg-tools.esm.min.js',
  browser: 'lib/tg-tools.browser.min.js',
};

const config = {
  input: './src/index.js',
  output: [
    {
      file: isProd ? minPkg.main : pkg.main,
      format: 'cjs',
    },
    {
      file: isProd ? minPkg.module : pkg.module,
      format: 'esm',
    },
    {
      file: isProd ? minPkg.browser : pkg.browser,
      format: 'umd',
      name: formatName,
    },
  ],
  plugins: [
    json(),
    commonjs({
      include: 'node_modules/**', // 包括
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**', // 排除引入的库
      runtimeHelpers: true, // 配置runtime，不设置会报错
    }),
    isProd && terser(),
  ],
};

export default config;
