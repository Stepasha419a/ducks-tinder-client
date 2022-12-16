import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { AppStateType } from './redux/reduxStore';
import Routing from './components/Routing/Routing';
import './App.css';
import { Notifications } from './components';

function App() {
  const isLoading = useSelector(
    (state: AppStateType) => state.authPage.isLoading
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
