import { ROUTES } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useAppSelector } from '@shared/lib';

export const InterestsSettingThumbnail = () => {
  const interests = useAppSelector(
    (state) => state.user.currentUser!.interests
  );

  const url = `${ROUTES.PROFILE}/edit/interests`;
  const value = interests.length ? `${interests[0]} and so on...` : 'Add';

  return (
    <LinkSettingThumbnail url={url} title="Interests" value={value} isPointer />
  );
};
