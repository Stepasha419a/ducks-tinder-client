import { useUserStore } from '@ducks-tinder-client/auth';
import { ROUTES } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const NameSettingThumbnail = () => {
  const { t } = useTranslation();

  const name = useUserStore((state) => state.currentUser?.name);

  const url = `${ROUTES.SETTINGS}/name`;
  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.account.thumbnails.name')}
      value={name || null}
      isPointer
    />
  );
};
