import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const ChronotypeSettingThumbnail = () => {
  const { t } = useTranslation();

  const chronotype = useUserStore((state) => state.currentUser?.chronotype);

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = chronotype ? t(`user.chronotype.${chronotype}`) : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.lifestyle.chronotype')}
      value={value}
      isPointer
    />
  );
};
