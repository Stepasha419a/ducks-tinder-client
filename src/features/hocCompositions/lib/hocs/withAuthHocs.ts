import { WithInitialLoading } from '@entities/user';
import { compose } from '@shared/lib';
import { WithErrorFallback } from '@shared/lib';
import { WithAuthRedirect } from './WithAuthRedirect';

export const withAuthHocs = compose(
  WithInitialLoading,
  WithAuthRedirect,
  (Component) => WithErrorFallback(Component, { redirect: true })
);
