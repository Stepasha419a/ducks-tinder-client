import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail, SettingNameEnum } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const SexSettingThumbnail = () => {
  const { t } = useTranslation();

  const sex = useAppSelector((state) => state.user.currentUser!.sex);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/sex`;
  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.account.thumbnails.sex')}
      value={t(`gender.${sex}`) || t('unknown')}
      isPointer
      isError={errorFields.includes(SettingNameEnum.SEX)}
    />
  );
};
