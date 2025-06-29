import type { ReactElement } from 'react';

import { ThemeProvider, ToastContainer } from '@ducks-tinder-client/ui';

import { withAppHocs } from './lib';
import { Routing } from './routing';
import '@ducks-tinder-client/ui/dist/esm/index.css';

// TODO: decompose ThemeProvider into hoc
function App(): ReactElement {
  return (
    <ThemeProvider>
      <Routing />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default withAppHocs(App);
