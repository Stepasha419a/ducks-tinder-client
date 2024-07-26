import { WithBrowserRouter } from '@app/lib';
import { StoreProvider } from '@app/lib';
import { compose } from '@shared/lib';
import { WithTheme } from '@shared/lib';

export const withAppHocs = compose(WithBrowserRouter, StoreProvider, WithTheme);
