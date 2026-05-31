import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const SmokingAttitudeSettingThumbnail = () => {
  const { t } = useTranslation();

  const smokingAttitude = useUserStore(
    (state) => state.currentUser?.smokingAttitude
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = smokingAttitude
    ? t(`user.smokingAttitude.${smokingAttitude}`)
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.lifestyle.smoking')}
      value={value}
      isPointer
    />
  );
};
