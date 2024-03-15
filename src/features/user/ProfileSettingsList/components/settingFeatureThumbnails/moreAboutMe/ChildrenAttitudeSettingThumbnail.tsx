import { LinkSettingThumbnail } from '@/entities/user/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const ChildrenAttitudeSettingThumbnail = () => {
  const childrenAttitude = useAppSelector(
    (state) => state.user.currentUser.childrenAttitude
  );

  const url = `${ROUTES.profile}/edit/more-about-me`;
  const value = childrenAttitude ? childrenAttitude : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Children attitude"
      value={value}
      isPointer
      isOverflow
    />
  );
};
