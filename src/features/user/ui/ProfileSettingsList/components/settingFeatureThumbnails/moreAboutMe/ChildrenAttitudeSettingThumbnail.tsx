import { LinkSettingThumbnail } from '@entities/user';
import { ROUTES } from '@shared/lib';
import { useAppSelector } from '@shared/lib';

export const ChildrenAttitudeSettingThumbnail = () => {
  const childrenAttitude = useAppSelector(
    (state) => state.user.currentUser!.childrenAttitude
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = childrenAttitude ? childrenAttitude : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Children attitude"
      value={value as string}
      isPointer
      isOverflow
    />
  );
};
