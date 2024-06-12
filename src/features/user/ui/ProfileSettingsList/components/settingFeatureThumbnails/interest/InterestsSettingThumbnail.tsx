import { LinkSettingThumbnail } from '@entities/user/ui';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';

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
