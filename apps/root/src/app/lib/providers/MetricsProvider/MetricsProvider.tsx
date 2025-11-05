import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import { useAppSelector } from '@ducks-tinder-client/common';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const MetricsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation();

  const user = useAppSelector((state) => state.user.currentUser);

  const instance = createInstance({
    urlBase: window._env_.VAR_MATOMO_URL || '',
    siteId: Number(window._env_.VAR_MATOMO_SITE_ID) || 0,
    linkTracking: true,
    userId: user?.id,
  });

  useEffect(() => {
    if (user) {
      instance.pushInstruction('setUserId', user.id);
    }
  }, [instance, user]);

  useEffect(() => {
    instance.trackPageView();
  }, [location, instance]);

  return (
    <>
      <MatomoProvider value={instance} />
      {children}
    </>
  );
};
