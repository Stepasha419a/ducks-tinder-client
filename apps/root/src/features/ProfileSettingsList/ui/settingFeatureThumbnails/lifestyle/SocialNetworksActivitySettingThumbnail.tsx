import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const SocialNetworksActivitySettingThumbnail = () => {
  const { t } = useTranslation();

  const socialNetworksActivity = useAppSelector(
    (state) => state.user.currentUser!.socialNetworksActivity
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = socialNetworksActivity
    ? t(`user.socialNetworksActivity.${socialNetworksActivity}`)
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.lifestyle.social')}
      value={value}
      isPointer
    />
  );
};
