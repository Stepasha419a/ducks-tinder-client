import { ROUTES , useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';

export const NicknameSettingThumbnail = () => {
  const nickname = useAppSelector((state) => state.user.currentUser!.nickname);

  const url = `${ROUTES.SETTINGS}/nickname`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Nickname"
      value={nickname || 'unknown'}
      isPointer
    />
  );
};
