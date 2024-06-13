import { LinkSettingThumbnail } from '@entities/user';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';

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
