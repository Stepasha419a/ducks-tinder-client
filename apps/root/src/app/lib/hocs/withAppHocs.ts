import {
  compose,
  WithTanstackQueryProvider,
} from '@ducks-tinder-client/common';

import { StoreProvider } from '../providers';
import { WithBrowserRouter } from './BrowserRouter';

export const withAppHocs = compose(
  WithBrowserRouter,
  StoreProvider,
  // TODO: why do I have to call it here if I already call it inside hoc composition?
  WithTanstackQueryProvider
);
