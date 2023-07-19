import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@shared/lib/hooks';

export const EmailSettingThumbnail = () => {
  const email = useAppSelector((state) => state.user.currentUser.email);

  return (
    <LinkSettingThumbnail url="email" title="Email" value={email} isPointer />
  );
};
