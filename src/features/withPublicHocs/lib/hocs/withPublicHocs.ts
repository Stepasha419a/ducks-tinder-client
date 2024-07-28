// just composition of feature-hocs
/* eslint-disable boundaries/element-types */
import { WithAuthRedirect } from '@features/WithAuthRedirect';
import { compose } from '@shared/lib';
import { WithErrorFallback } from '@shared/lib';

export const withPublicHocs = compose(WithAuthRedirect, (Component) =>
  WithErrorFallback(Component, { redirect: true })
);
