import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@hooks';

export const PreferSexSettingThumbnail = () => {
  const preferSex = useAppSelector((state) => state.user.currentUser.preferSex);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  return (
    <LinkSettingThumbnail
      url="prefer-sex"
      title="Interested in"
      value={preferSex}
      isPointer
      isError={errorFields.includes('preferSex')}
    />
  );
};
