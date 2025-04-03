import { ROUTES } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useAppSelector } from '@shared/lib';

export const PersonalityTypeSettingThumbnail = () => {
  const personalityType = useAppSelector(
    (state) => state.user.currentUser!.personalityType
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = personalityType ? personalityType : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Personality type"
      value={value as string}
      isPointer
    />
  );
};
