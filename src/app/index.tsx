import type { ReactElement } from 'react';
import Routing from '@pages/index';
import { Loading } from '@entities/user';
import { ToastContainer } from '@shared/ui';
import './styles/index.scss';
import { withAppHocs } from './lib';

function App(): ReactElement {
  return (
    <>
      <Loading />
      <Routing />
      <ToastContainer />
    </>
  );
}

export default withAppHocs(App);