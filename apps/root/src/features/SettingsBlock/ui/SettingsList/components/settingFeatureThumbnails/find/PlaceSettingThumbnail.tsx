import { useTranslation } from 'react-i18next';
import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useUserStore } from '@ducks-tinder-client/auth';

export const PlaceSettingThumbnail = () => {
  const { t } = useTranslation();
  const place = useUserStore((state) => state.currentUser?.place);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/place`;
  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.find.thumbnails.place')}
      value={place?.name || t('unknown')}
      isPointer
      isError={errorFields.includes('place')}
      isOverflow
    />
  );
};
