import { LinkSettingThumbnail } from '@/entities/setting/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const AlcoholAttitudeSettingThumbnail = () => {
  const alcoholAttitude = useAppSelector(
    (state) => state.user.currentUser.alcoholAttitude
  );

  const url = `${ROUTES.profile}/edit/lifestyle`;
  const value = alcoholAttitude ? alcoholAttitude.name : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Drinking"
      value={value}
      isPointer
    />
  );
};
