import { ROUTES } from '@shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@shared/lib/hooks';

export const NicknameSettingThumbnail = () => {
  const nickname = useAppSelector((state) => state.user.currentUser.nickname);

  const url = `${ROUTES.settings}/nickname`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Nickname"
      value={nickname || 'unknown'}
      isPointer
    />
  );
};
