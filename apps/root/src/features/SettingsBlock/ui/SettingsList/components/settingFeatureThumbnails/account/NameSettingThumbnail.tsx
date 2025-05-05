import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';

export const NameSettingThumbnail = () => {
  const name = useAppSelector((state) => state.user.currentUser!.name);

  const url = `${ROUTES.SETTINGS}/name`;
  return <LinkSettingThumbnail url={url} title="Name" value={name} isPointer />;
};
