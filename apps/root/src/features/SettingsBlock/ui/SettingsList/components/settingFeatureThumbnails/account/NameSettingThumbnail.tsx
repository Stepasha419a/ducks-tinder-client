import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const NameSettingThumbnail = () => {
  const { t } = useTranslation();

  const name = useAppSelector((state) => state.user.currentUser!.name);

  const url = `${ROUTES.SETTINGS}/name`;
  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.account.thumbnails.name')}
      value={name}
      isPointer
    />
  );
};
