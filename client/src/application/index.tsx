import '@app/dev'; // dev (to fetch server dev methods from window object)
import type { ReactElement } from 'react';
import Routing from '@pages/index';
import { Loading } from '@entities/auth/components';
import { Notifications } from '@entities/notification/components';
import { withAppHocs } from '@hocs';
import './styles/index.scss';

function App(): ReactElement {
  return (
    <>
      <Loading />
      <Routing />
      <Notifications />
    </>
  );
}

export default withAppHocs(App);
