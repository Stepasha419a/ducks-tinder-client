import { WithAuthRedirect } from '@entities/user';
import { compose } from '@shared/helpers';
import { WithErrorFallback } from '@shared/lib/hocs';

export const withPublicPageHocs = compose(WithAuthRedirect, (Component) =>
  WithErrorFallback(Component, { redirect: true })
);
