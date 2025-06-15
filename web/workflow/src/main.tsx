import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.css';
import { Theme } from '@radix-ui/themes';
import { App } from './app.tsx';
import '@radix-ui/themes/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme
      appearance="dark"
      accentColor="mint"
    >
      <App />
    </Theme>
  </StrictMode>,
);
