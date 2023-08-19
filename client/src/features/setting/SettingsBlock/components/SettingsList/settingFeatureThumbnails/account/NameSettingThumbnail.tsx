import { ROUTES } from '@/shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@shared/lib/hooks';

export const NameSettingThumbnail = () => {
  const name = useAppSelector((state) => state.user.currentUser.name);

  const url = `${ROUTES.settings}/name`;
  return <LinkSettingThumbnail url={url} title="Name" value={name} isPointer />;
};
