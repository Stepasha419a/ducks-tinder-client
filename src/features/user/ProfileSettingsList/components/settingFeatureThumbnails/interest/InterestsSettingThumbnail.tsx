import { ROUTES } from '@shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/user/components';
import { useAppSelector } from '@shared/lib/hooks';

export const InterestsSettingThumbnail = () => {
  const interests = useAppSelector(
    (state) => state.user.currentUser!.interests
  );

  const url = `${ROUTES.profile}/edit/interests`;
  const value = interests.length ? `${interests[0]} and so on...` : 'Add';

  return (
    <LinkSettingThumbnail url={url} title="Interests" value={value} isPointer />
  );
};
