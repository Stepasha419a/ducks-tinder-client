import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const CommunicationStyleSettingThumbnail = () => {
  const { t } = useTranslation();

  const communicationStyle = useUserStore(
    (state) => state.currentUser?.communicationStyle
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = communicationStyle
    ? t(`user.communicationStyle.${communicationStyle}`)
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.moreAboutMe.communication')}
      value={value}
      isPointer
    />
  );
};
