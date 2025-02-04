import { compose } from '@ducks-tinder-client/common';
import { StoreProvider } from '../providers';
import { WithBrowserRouter } from './BrowserRouter';

export const withAppHocs = compose(WithBrowserRouter, StoreProvider);
