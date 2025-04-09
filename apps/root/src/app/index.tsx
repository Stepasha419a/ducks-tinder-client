import type { ReactElement } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { ThemeProvider, ToastContainer } from '@ducks-tinder-client/ui';

import { withAppHocs } from './lib';
import { Routing } from './routing';
import './styles/index.scss';
import '@ducks-tinder-client/ui/dist/ui.css';

// TODO: decompose ThemeProvider into hoc
function App(): ReactElement {
  return (
    <ThemeProvider>
      <Routing />
      <ToastContainer />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default withAppHocs(App);
