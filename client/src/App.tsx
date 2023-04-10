import type { ReactElement } from 'react';
import { Loading, Notifications } from '@components';
import Routing from '@pages/index';

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
