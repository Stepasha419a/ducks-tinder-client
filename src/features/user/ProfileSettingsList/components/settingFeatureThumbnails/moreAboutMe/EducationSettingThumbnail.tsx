import { LinkSettingThumbnail } from '@/entities/user/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const EducationSettingThumbnail = () => {
  const education = useAppSelector(
    (state) => state.user.currentUser!.education
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = education ? education : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Education"
      value={value as string}
      isPointer
    />
  );
};
