import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Routing from './components/Routing/Routing';
import './App.css';
import { Notifications } from './components';
import { useAppSelector } from './redux/reduxStore';

function App() {
  const isLoading = useAppSelector(
    (state) => state.authPage.isLoading
  );

  return (
    <div>
      <div
        className={'loading-page ' + (!isLoading && 'loading-page--invisible')}
      >
        <FontAwesomeIcon
          icon={faFireFlameCurved}
          className="loading-page__icon"
        />
      </div>

      <Routing />

      <Notifications />
    </div>
  );
}

export default App;
