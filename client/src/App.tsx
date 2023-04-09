import type { ReactElement } from 'react';
import Routing from './pages/Routing/Routing';
import { Loading, Notifications } from '@components';

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
