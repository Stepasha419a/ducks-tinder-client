import { LocaleProvider, type Locale } from '@ducks-tinder-client/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const LibLocaleProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { t } = useTranslation();

  const locale = useMemo<Locale>(
    () => ({
      distance: t('ui.distance'),
      livesIn: t('ui.livesIn'),
      altAvatar: t('ui.altAvatar'),
      ariaOpenFullPreview: t('ui.ariaOpenFullPreview'),
      unknownPlace: t('ui.unknownPlace'),
      moreAboutMe: t('ui.moreAboutMe'),
      lifestyle: t('ui.lifestyle'),
      interestsTitle: t('ui.interests'),
      close: t('ui.close'),
      showAll: t('ui.showAll'),
      ariaShowAllInterests: t('ui.ariaShowAllInterests'),
    }),
    [t]
  );

  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
};
