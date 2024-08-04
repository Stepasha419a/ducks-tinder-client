import { WithAuthRedirect } from '@features/WithAuthRedirect';
import { WithInitialLoading } from '@entities/user';
import { compose } from '@shared/lib';
import { WithErrorFallback } from '@shared/lib';

export const withAuthHocs = compose(
  WithInitialLoading,
  WithAuthRedirect,
  (Component) => WithErrorFallback(Component, { redirect: true })
);
