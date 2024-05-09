import { react } from '@tarsilla/eslint-config';

const config = react({ ignores: ['**/.vscode/', '**/node_modules/', '**/lib/'] });
export default config;
