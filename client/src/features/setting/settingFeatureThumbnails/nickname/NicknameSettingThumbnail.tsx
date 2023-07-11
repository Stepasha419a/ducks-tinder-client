import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@hooks';

export const NicknameSettingThumbnail = () => {
  const nickname = useAppSelector((state) => state.user.currentUser.nickname);

  return (
    <LinkSettingThumbnail
      url="nickname"
      title="Nickname"
      value={nickname || 'unknown'}
      isPointer
    />
  );
};
