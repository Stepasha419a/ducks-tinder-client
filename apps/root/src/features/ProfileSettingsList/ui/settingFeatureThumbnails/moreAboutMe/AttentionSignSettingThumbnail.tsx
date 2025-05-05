import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';

export const AttentionSignSettingThumbnail = () => {
  const attentionSign = useAppSelector(
    (state) => state.user.currentUser!.attentionSign
  );

  const url = `${ROUTES.PROFILE}/edit/more-about-me`;
  const value = attentionSign ? attentionSign : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Attention sign"
      value={value as string}
      isPointer
    />
  );
};
