import { rollupReactConfig } from '@tarsilla/rollup-config/react';

export default [
  ...rollupReactConfig({ external: ['react-tabs/style/react-tabs.css', 'react-toastify/dist/ReactToastify.css'] }),
  ...rollupReactConfig({ folder: 'input' }),
  ...rollupReactConfig({ folder: 'label' }),
  ...rollupReactConfig({ folder: 'loading' }),
  ...rollupReactConfig({ folder: 'select' }),
  ...rollupReactConfig({ external: ['react-tabs/style/react-tabs.css'], folder: 'tab' }),
  ...rollupReactConfig({ folder: 'textarea' }),
  ...rollupReactConfig({ external: ['react-toastify/dist/ReactToastify.css'], folder: 'toast' }),
];
