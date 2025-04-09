import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useAppSelector } from '@shared/lib';

export const PlaceSettingThumbnail = () => {
  const place = useAppSelector((state) => state.user.currentUser!.place);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/place`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Place"
      value={place?.name || 'unknown'}
      isPointer
      isError={errorFields.includes('place')}
      isOverflow
    />
  );
};
