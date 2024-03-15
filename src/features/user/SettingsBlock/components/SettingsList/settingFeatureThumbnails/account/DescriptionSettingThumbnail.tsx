import { ROUTES } from '@shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/user/components';
import { useAppSelector } from '@shared/lib/hooks';

export const DescriptionSettingThumbnail = () => {
  const description = useAppSelector(
    (state) => state.user.currentUser.description
  );
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const url = `${ROUTES.settings}/description`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Description"
      value={description || 'Empty description'}
      isPointer
      isError={errorFields.includes('description')}
      isOverflow
    />
  );
};
