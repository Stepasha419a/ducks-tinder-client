import { LinkSettingThumbnail } from '@/entities/setting/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const SmokingAttitudeSettingThumbnail = () => {
  const smokingAttitude = useAppSelector(
    (state) => state.user.currentUser.smokingAttitude
  );

  const url = `${ROUTES.profile}/edit/lifestyle`;
  const value = smokingAttitude ? smokingAttitude.name : 'Add';

  return (
    <LinkSettingThumbnail url={url} title="Smoking" value={value} isPointer />
  );
};
