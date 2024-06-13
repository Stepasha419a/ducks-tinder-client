import type { ReactElement } from 'react';
import { withAppHocs } from '@hocs';
import Routing from '@pages/index';
import { Loading } from '@entities/user';
import { ToastContainer } from '@shared/ui';
import './styles/index.scss';

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
