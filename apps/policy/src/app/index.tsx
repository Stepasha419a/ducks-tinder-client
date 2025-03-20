import { ThemeProvider } from '@ducks-tinder-client/ui';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { ReactElement } from 'react';
import PolicyPage from '@pages/Policy';
import '@ducks-tinder-client/ui/dist/ui.css';

// TODO: decompose ThemeProvider into hoc
function App(): ReactElement {
  return (
    <ThemeProvider>
      <PolicyPage />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
