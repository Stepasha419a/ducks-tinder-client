import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const NicknameSettingThumbnail = () => {
  const { t } = useTranslation();

  const nickname = useUserStore((state) => state.currentUser?.nickname);

  const url = `${ROUTES.SETTINGS}/nickname`;
  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.account.thumbnails.nickname')}
      value={nickname || t('unknown')}
      isPointer
    />
  );
};
