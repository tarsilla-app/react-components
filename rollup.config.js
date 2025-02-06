/* eslint-disable @typescript-eslint/no-unsafe-call */

import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

function generateBuild(folder) {
  const url = folder ? `${folder}/` : '';
  return [
    {
      input: `src/${url}index.ts`,
      output: [
        {
          file: `lib/${url}index.cjs`,
          format: 'cjs',
          sourcemap: true,
          exports: 'auto',
        },
        {
          file: `lib/${url}index.mjs`,
          format: 'esm',
          sourcemap: true,
          exports: 'auto',
        },
      ],
      plugins: [
        peerDepsExternal({ includeDependencies: true }),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss({
          modules: true,
        }),
        terser(),
      ],
    },
    {
      input: `./src/${url}index.ts`,
      output: [{ file: `./lib/${url}index.d.ts`, format: 'esm' }],
      plugins: [dts()],
    },
  ];
}

export default [
  ...generateBuild(),
  ...generateBuild('loading'),
  ...generateBuild('select'),
  ...generateBuild('tab'),
  ...generateBuild('text'),
  ...generateBuild('textarea'),
  ...generateBuild('toast'),
];
