import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, setUiLibSettings } from '@ducks-tinder-client/ui';

import PolicyPage from './policy';
import '@ducks-tinder-client/ui/dist/esm/index.css';

setUiLibSettings({ IMAGE_BASE_URL: window._env_.VAR_FILE_SERVICE_URL });

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PolicyPage />
      </ThemeProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
