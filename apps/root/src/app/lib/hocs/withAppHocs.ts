import { compose } from '@shared/lib';
import { WithTheme } from '@shared/lib';
import { StoreProvider } from '../providers';
import { WithBrowserRouter } from './BrowserRouter';

export const withAppHocs = compose(WithBrowserRouter, StoreProvider, WithTheme);
