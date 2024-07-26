import { WithAuthRedirect } from '@features/user';
import { compose } from '@shared/lib';
import { WithErrorFallback } from '@shared/lib';

export const withPublicPageHocs = compose(WithAuthRedirect, (Component) =>
  WithErrorFallback(Component, { redirect: true })
);
