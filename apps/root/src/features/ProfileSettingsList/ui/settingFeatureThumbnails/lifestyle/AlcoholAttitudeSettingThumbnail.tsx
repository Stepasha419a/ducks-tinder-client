import { ROUTES } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useAppSelector } from '@shared/lib';

export const AlcoholAttitudeSettingThumbnail = () => {
  const alcoholAttitude = useAppSelector(
    (state) => state.user.currentUser!.alcoholAttitude
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = alcoholAttitude ? alcoholAttitude : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Drinking"
      value={value as string}
      isPointer
    />
  );
};
