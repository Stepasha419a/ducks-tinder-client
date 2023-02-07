import Routing from './components/Routing/Routing';
import { Loading, Notifications } from './components';

function App() {
  return (
    <>
      <Loading />
      <Routing />
      <Notifications />
    </>
  );
}

export default App;
