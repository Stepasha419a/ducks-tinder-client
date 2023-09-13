import { LinkSettingThumbnail } from '@/entities/setting/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const PersonalityTypeSettingThumbnail = () => {
  const personalityType = useAppSelector(
    (state) => state.user.currentUser.personalityType
  );

  const url = `${ROUTES.profile}/edit/more-about-me`;
  const value = personalityType
    ? personalityType.name
    : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Personality type"
      value={value}
      isPointer
    />
  );
};
