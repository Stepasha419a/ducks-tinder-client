import { ROUTES } from '@/shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@shared/lib/hooks';

export const PreferSexSettingThumbnail = () => {
  const preferSex = useAppSelector((state) => state.user.currentUser.preferSex);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const url = `${ROUTES.settings}/prefer-sex`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Interested in"
      value={preferSex}
      isPointer
      isError={errorFields.includes('preferSex')}
    />
  );
};
