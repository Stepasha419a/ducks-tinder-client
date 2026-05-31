import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const EducationSettingThumbnail = () => {
  const { t } = useTranslation();

  const education = useUserStore((state) => state.currentUser?.education);

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = education ? t(`user.education.${education}`) : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.moreAboutMe.education')}
      value={value}
      isPointer
    />
  );
};
