import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const ZodiacSignSettingThumbnail = () => {
  const { t } = useTranslation();

  const zodiacSign = useUserStore((state) => state.currentUser?.zodiacSign);

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = zodiacSign ? t(`user.zodiacSign.${zodiacSign}`) : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.moreAboutMe.zodiac')}
      value={value}
      isPointer
    />
  );
};
