import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { ReactElement } from 'react';
import { InitialLoading } from '@entities/user';
import { ToastContainer } from '@shared/ui';
import { withAppHocs } from './lib';
import { Routing } from './ui';

function App(): ReactElement {
  return (
    <>
      <InitialLoading />
      <Routing />
      <ToastContainer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default withAppHocs(App);
