import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const AlcoholAttitudeSettingThumbnail = () => {
  const { t } = useTranslation();

  const alcoholAttitude = useUserStore(
    (state) => state.currentUser?.alcoholAttitude
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = alcoholAttitude
    ? t(`user.alcoholAttitude.${alcoholAttitude}`)
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.lifestyle.drinking')}
      value={value}
      isPointer
    />
  );
};
