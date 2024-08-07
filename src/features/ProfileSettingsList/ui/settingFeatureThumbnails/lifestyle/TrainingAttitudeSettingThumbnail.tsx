import { LinkSettingThumbnail } from '@entities/user';
import { ROUTES } from '@shared/lib';
import { useAppSelector } from '@shared/lib';

export const TrainingAttitudeSettingThumbnail = () => {
  const trainingAttitude = useAppSelector(
    (state) => state.user.currentUser!.trainingAttitude
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = trainingAttitude ? trainingAttitude : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Workout"
      value={value as string}
      isPointer
    />
  );
};
