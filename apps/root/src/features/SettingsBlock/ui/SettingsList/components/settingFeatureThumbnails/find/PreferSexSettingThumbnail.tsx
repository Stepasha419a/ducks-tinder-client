import { useTranslation } from 'react-i18next';
import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail, SettingNameEnum } from '@entities/user';
import { useUserStore } from '@ducks-tinder-client/auth';

export const PreferSexSettingThumbnail = () => {
  const { t } = useTranslation();
  const preferSex = useUserStore((state) => state.currentUser?.preferSex);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/prefer-sex`;
  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.find.thumbnails.preferSex')}
      value={preferSex ? t(`gender.${preferSex}`) : t('unknown')}
      isPointer
      isError={errorFields.includes(SettingNameEnum.PREFER_SEX)}
    />
  );
};
