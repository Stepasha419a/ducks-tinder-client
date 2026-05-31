import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const InterestsSettingThumbnail = () => {
  const { t } = useTranslation();

  const interests = useUserStore((state) => state.currentUser?.interests);

  const url = `${ROUTES.PROFILE}/edit/interests`;
  const value = interests?.length
    ? `${t(`user.interests.${interests[0]}`)} ${t('andSoOn')}`
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.interests.thumbnail')}
      value={value}
      isPointer
    />
  );
};
