import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@ducks-tinder-client/ui';

import PolicyPage from './policy';
import '@ducks-tinder-client/ui/dist/esm/index.css';

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
