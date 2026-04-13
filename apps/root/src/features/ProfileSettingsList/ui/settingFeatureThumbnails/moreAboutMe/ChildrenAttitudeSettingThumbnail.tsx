import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const ChildrenAttitudeSettingThumbnail = () => {
  const { t } = useTranslation();

  const childrenAttitude = useAppSelector(
    (state) => state.user.currentUser!.childrenAttitude
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = childrenAttitude
    ? t(`user.childrenAttitude.${childrenAttitude}`)
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.moreAboutMe.children')}
      value={value}
      isPointer
      isOverflow
    />
  );
};
