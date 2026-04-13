import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const PetSettingThumbnail = () => {
  const { t } = useTranslation();

  const pet = useAppSelector((state) => state.user.currentUser!.pet);

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
