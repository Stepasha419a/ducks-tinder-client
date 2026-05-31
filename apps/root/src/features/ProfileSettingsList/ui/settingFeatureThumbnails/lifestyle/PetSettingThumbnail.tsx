import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const PetSettingThumbnail = () => {
  const { t } = useTranslation();

  const pet = useUserStore((state) => state.currentUser?.pet);

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = pet ? t(`user.pet.${pet}`) : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.lifestyle.pets')}
      value={value}
      isPointer
    />
  );
};
