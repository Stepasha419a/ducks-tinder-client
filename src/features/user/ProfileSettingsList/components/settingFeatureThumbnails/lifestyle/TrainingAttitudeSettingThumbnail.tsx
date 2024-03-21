import { LinkSettingThumbnail } from '@/entities/user/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const TrainingAttitudeSettingThumbnail = () => {
  const trainingAttitude = useAppSelector(
    (state) => state.user.currentUser!.trainingAttitude
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = trainingAttitude ? trainingAttitude : 'Add';

  return (
    <LinkSettingThumbnail url={url} title="Workout" value={value} isPointer />
  );
};
