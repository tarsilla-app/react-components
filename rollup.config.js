import { rollupReactConfig } from '@tarsilla/rollup-config/react';

export default [
  ...rollupReactConfig({ external: ['react-tabs/style/react-tabs.css', 'react-toastify/dist/ReactToastify.css'] }),
  ...rollupReactConfig({ folder: 'label' }),
  ...rollupReactConfig({ folder: 'loading' }),
  ...rollupReactConfig({ folder: 'select' }),
  ...rollupReactConfig({ folder: 'tab', external: ['react-tabs/style/react-tabs.css'] }),
  ...rollupReactConfig({ folder: 'text' }),
  ...rollupReactConfig({ folder: 'textarea' }),
  ...rollupReactConfig({ folder: 'toast', external: ['react-toastify/dist/ReactToastify.css'] }),
];
