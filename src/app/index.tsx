import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { ReactElement } from 'react';
import Routing from '@pages/index';
import { InitialLoading } from '@entities/user';
import { ToastContainer } from '@shared/ui';
import './styles/index.scss';
import { withAppHocs } from './lib';

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
