import { ToastContainer } from '@ducks-tinder-client/ui';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { ReactElement } from 'react';
import { withAppHocs } from './lib';
import { Routing } from './routing';
import './styles/index.scss';

function App(): ReactElement {
  return (
    <>
      <Routing />
      <ToastContainer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default withAppHocs(App);
