import { LinkSettingThumbnail } from '@entities/user/ui';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';

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
