import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@hooks';

export const InterestsSettingThumbnail = () => {
  const interests = useAppSelector((state) => state.user.currentUser.interests);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  return (
    <LinkSettingThumbnail
      url="interests"
      title="Interests"
      value={
        !interests.length
          ? 'Empty interests'
          : `${interests[0].name} and so on...`
      }
      isPointer
      isError={errorFields.includes('interests')}
    />
  );
};
