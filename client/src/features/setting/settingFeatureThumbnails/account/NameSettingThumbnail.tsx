import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@hooks';

export const NameSettingThumbnail = () => {
  const name = useAppSelector((state) => state.user.currentUser.name);

  return (
    <LinkSettingThumbnail url="name" title="Name" value={name} isPointer />
  );
};
