import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const EmailSettingThumbnail = () => {
  const { t } = useTranslation();

  const email = useAppSelector((state) => state.auth.authData!.email);

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
