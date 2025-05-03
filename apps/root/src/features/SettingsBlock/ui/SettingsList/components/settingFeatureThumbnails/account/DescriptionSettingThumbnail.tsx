import { ROUTES , useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail, SettingNameEnum } from '@entities/user';

export const DescriptionSettingThumbnail = () => {
  const description = useAppSelector(
    (state) => state.user.currentUser!.description
  );
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/description`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Description"
      value={description || 'unknown'}
      isPointer
      isError={errorFields.includes(SettingNameEnum.DESCRIPTION)}
      isOverflow
    />
  );
};
