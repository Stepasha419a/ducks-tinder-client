import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail, SettingNameEnum } from '@entities/user';

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
