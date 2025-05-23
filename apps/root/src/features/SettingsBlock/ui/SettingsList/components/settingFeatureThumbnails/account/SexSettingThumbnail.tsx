import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail, SettingNameEnum } from '@entities/user';

export const SexSettingThumbnail = () => {
  const sex = useAppSelector((state) => state.user.currentUser!.sex);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/sex`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Sex"
      value={sex || 'unknown'}
      isPointer
      isError={errorFields.includes(SettingNameEnum.SEX)}
    />
  );
};
