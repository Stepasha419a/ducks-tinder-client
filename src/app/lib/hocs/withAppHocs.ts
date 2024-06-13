import { WithBrowserRouter } from '@app/lib';
import { StoreProvider } from '@app/lib';
import { compose } from '@shared/helpers';
import { WithTheme } from '@shared/lib/hocs';

export const withAppHocs = compose(WithBrowserRouter, StoreProvider, WithTheme);
