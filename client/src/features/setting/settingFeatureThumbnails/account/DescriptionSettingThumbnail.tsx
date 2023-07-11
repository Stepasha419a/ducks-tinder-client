import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@hooks';

export const DescriptionSettingThumbnail = () => {
  const description = useAppSelector(
    (state) => state.user.currentUser.description
  );
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  return (
    <LinkSettingThumbnail
      url="description"
      title="Description"
      value={description || 'Empty description'}
      isPointer
      isError={errorFields.includes('description')}
      isOverflow
    />
  );
};
