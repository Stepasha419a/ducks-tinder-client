import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@hooks';

export const PlaceSettingThumbnail = () => {
  const place = useAppSelector((state) => state.user.currentUser.place);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  return (
    <LinkSettingThumbnail
      url="place"
      title="Place"
      value={place?.name || 'Empty place'}
      isPointer
      isError={errorFields.includes('place')}
      isOverflow
    />
  );
};
