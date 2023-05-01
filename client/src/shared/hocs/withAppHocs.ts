import { WithBrowserRouter } from '@app/hocs';
import { StoreProvider } from '@app/providers';
import { compose } from '../helpers';

export const withAppHocs = compose(WithBrowserRouter, StoreProvider);
