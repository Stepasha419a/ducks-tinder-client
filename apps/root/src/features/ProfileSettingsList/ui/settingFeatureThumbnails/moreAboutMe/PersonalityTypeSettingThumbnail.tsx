import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const PersonalityTypeSettingThumbnail = () => {
  const { t } = useTranslation();

  const personalityType = useUserStore(
    (state) => state.currentUser?.personalityType
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = personalityType
    ? t(`user.personalityType.${personalityType}`)
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.moreAboutMe.personality')}
      value={value}
      isPointer
    />
  );
};
