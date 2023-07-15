import { WithBrowserRouter } from '@app/hocs';
import { StoreProvider } from '@app/providers';
import { WithTheme } from '@/features/theme/lib';
import { compose } from '../helpers';

export const withAppHocs = compose(WithBrowserRouter, StoreProvider, WithTheme);
