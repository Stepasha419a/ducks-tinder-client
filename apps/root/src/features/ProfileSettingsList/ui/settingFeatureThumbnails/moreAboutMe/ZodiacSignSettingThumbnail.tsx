import { ROUTES } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useAppSelector } from '@shared/lib';

export const ZodiacSignSettingThumbnail = () => {
  const zodiacSign = useAppSelector(
    (state) => state.user.currentUser!.zodiacSign
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = zodiacSign ? zodiacSign : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Zodiac"
      value={value as string}
      isPointer
    />
  );
};
