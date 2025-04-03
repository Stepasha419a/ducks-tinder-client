import { ROUTES } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { SettingNameEnum } from '@entities/user';
import { useAppSelector } from '@shared/lib';

export const PreferSexSettingThumbnail = () => {
  const preferSex = useAppSelector(
    (state) => state.user.currentUser!.preferSex
  );
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/prefer-sex`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Interested in"
      value={preferSex || 'unknown'}
      isPointer
      isError={errorFields.includes(SettingNameEnum.PREFER_SEX)}
    />
  );
};
