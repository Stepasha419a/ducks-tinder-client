import { ROUTES , useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';

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
