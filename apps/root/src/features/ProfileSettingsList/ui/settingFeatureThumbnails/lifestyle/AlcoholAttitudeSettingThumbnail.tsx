import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const AlcoholAttitudeSettingThumbnail = () => {
  const { t } = useTranslation();

  const alcoholAttitude = useAppSelector(
    (state) => state.user.currentUser!.alcoholAttitude
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
