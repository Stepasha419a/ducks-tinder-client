import { ROUTES } from '@shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/user/components';
import { useAppSelector } from '@shared/lib/hooks';

export const PlaceSettingThumbnail = () => {
  const place = useAppSelector((state) => state.user.currentUser.place);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const url = `${ROUTES.settings}/place`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Place"
      value={place?.name || 'Empty place'}
      isPointer
      isError={errorFields.includes('place')}
      isOverflow
    />
  );
};
