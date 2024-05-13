import { react } from '@tarsilla/eslint-config';
import css from 'eslint-plugin-css';

const config = [
  ...react({
    ignores: [
      '**/.vscode/',
      '**/node_modules/',
      '**/lib/',
      '**/storybook-static/',
    ],
  }),
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: { css },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...css.configs.recommended.rules,
      'react/prop-types': 'off',
    },
  },
];
export default config;
