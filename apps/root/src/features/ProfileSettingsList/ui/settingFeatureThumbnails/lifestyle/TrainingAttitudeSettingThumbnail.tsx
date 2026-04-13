import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const TrainingAttitudeSettingThumbnail = () => {
  const { t } = useTranslation();

  const trainingAttitude = useAppSelector(
    (state) => state.user.currentUser!.trainingAttitude
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = trainingAttitude
    ? t(`user.trainingAttitude.${trainingAttitude}`)
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.lifestyle.workout')}
      value={value}
      isPointer
    />
  );
};
