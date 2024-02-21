import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';
import { LinkSettingThumbnail } from '@/entities/setting/components';

export const ZodiacSignSettingThumbnail = () => {
  const zodiacSign = useAppSelector(
    (state) => state.user.currentUser.zodiacSign
  );

  const url = `${ROUTES.profile}/edit/more-about-me`;
  const value = zodiacSign ? zodiacSign : 'Add';

  return (
    <LinkSettingThumbnail url={url} title="Zodiac" value={value} isPointer />
  );
};
