import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const AttentionSignSettingThumbnail = () => {
  const { t } = useTranslation();

  const attentionSign = useAppSelector(
    (state) => state.user.currentUser!.attentionSign
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = attentionSign
    ? t(`user.attentionSign.${attentionSign}`)
    : t('add');

  return (
    <LinkSettingThumbnail
      url={url}
      title={t('profile.settings.moreAboutMe.attention')}
      value={value}
      isPointer
    />
  );
};
