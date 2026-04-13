import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const FoodPreferenceSettingThumbnail = () => {
  const { t } = useTranslation();

  const foodPreference = useAppSelector(
    (state) => state.user.currentUser!.foodPreference
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = foodPreference
    ? t(`user.foodPreference.${foodPreference}`)
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.lifestyle.food')}
      value={value}
      isPointer
    />
  );
};
