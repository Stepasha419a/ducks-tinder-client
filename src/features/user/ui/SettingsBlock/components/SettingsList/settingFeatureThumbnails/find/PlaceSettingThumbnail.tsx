import { LinkSettingThumbnail } from '@entities/user/ui';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';

export const PlaceSettingThumbnail = () => {
  const place = useAppSelector((state) => state.user.currentUser!.place);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/place`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Place"
      value={place?.name || 'unknown'}
      isPointer
      isError={errorFields.includes('place')}
      isOverflow
    />
  );
};
