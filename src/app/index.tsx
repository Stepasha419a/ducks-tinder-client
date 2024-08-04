import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { ReactElement } from 'react';
import { ToastContainer } from '@shared/ui';
import { withAppHocs } from './lib';
import { Routing } from './ui';

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
