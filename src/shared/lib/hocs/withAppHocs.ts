import { WithBrowserRouter } from '@app/lib';
import { StoreProvider } from '@app/lib';
import { WithTheme } from '@features/theme/lib';
import { compose } from '../helpers';

export const withAppHocs = compose(WithBrowserRouter, StoreProvider, WithTheme);
