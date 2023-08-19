import { ROUTES } from '@/shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@shared/lib/hooks';

export const SexSettingThumbnail = () => {
  const sex = useAppSelector((state) => state.user.currentUser.sex);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const url = `${ROUTES.settings}/sex`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Sex"
      value={sex}
      isPointer
      isError={errorFields.includes('sex')}
    />
  );
};
