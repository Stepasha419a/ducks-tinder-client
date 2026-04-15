import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const NicknameSettingThumbnail = () => {
  const { t } = useTranslation();

  const nickname = useAppSelector((state) => state.user.currentUser!.nickname);

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
