import { ThemeProvider } from '@ducks-tinder-client/ui';
import ReactDOM from 'react-dom/client';
import '@ducks-tinder-client/ui/dist/ui.css';
import { BrowserRouter } from 'react-router-dom';
import PolicyPage from './policy';

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
