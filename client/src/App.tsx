import type { ReactElement } from 'react';
import Routing from '@pages/index';
import { Loading } from '@entities/auth/components';
import { Notifications } from '@entities/notification/components';

function App(): ReactElement {
  return (
    <>
      <Loading />
      <Routing />
      <Notifications />
    </>
  );
}

export default App;
