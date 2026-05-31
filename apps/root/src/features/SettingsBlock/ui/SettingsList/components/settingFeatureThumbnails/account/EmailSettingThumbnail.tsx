import { useAuthStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const EmailSettingThumbnail = () => {
  const { t } = useTranslation();

  const email = useAuthStore((state) => state.authData?.email) || null;

  const url = `${ROUTES.SETTINGS}/email`;
  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.account.thumbnails.email')}
      value={email}
      isPointer
      isOverflow
    />
  );
};
