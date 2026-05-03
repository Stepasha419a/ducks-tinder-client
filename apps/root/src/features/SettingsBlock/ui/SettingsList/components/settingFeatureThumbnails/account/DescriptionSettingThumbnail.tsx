import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail, SettingNameEnum } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const DescriptionSettingThumbnail = () => {
  const { t } = useTranslation();

  const description = useAppSelector(
    (state) => state.user.currentUser!.description
  );
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/description`;
  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.account.thumbnails.description')}
      value={description || t('unknown')}
      isPointer
      isError={errorFields.includes(SettingNameEnum.DESCRIPTION)}
      isOverflow
    />
  );
};
