import type { ReactElement } from 'react';
import Routing from '@pages/index';
import { Loading } from '@/entities/user/ui';
import { withAppHocs } from '@hocs';
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
