import { WithAuthRedirect } from '@entities/user';
import { compose } from '@shared/lib';
import { WithErrorFallback } from '@shared/lib';

export const withPublicPageHocs = compose(WithAuthRedirect, (Component) =>
  WithErrorFallback(Component, { redirect: true })
);
