import React from 'react';

import { MetricsProvider } from './MetricsProvider';

export const isMatomoDisabled =
  !window._env_.VAR_MATOMO_URL || !window._env_.VAR_MATOMO_SITE_ID;

export const OptionalMetricsProvider: React.FC<React.PropsWithChildren> = ({
  children,
  // eslint-disable-next-line @typescript-eslint/promise-function-async
}) => {
  if (isMatomoDisabled) {
    return children;
  }

  return <MetricsProvider>{children}</MetricsProvider>;
};
