import { readFileSync } from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default {
  input: 'src/weather-alerts-card.ts',
  output: {
    file: 'dist/weather-alerts-card.js',
    format: 'es',
  },
  plugins: [
    replace({
      __CARD_VERSION__: JSON.stringify(pkg.version),
      preventAssignment: true,
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          noEmit: false,
          declaration: false,
        },
      },
    }),
    terser(),
  ],
};
