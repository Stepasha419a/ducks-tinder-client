import { LinkSettingThumbnail } from '@entities/user/ui';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';

export const NameSettingThumbnail = () => {
  const name = useAppSelector((state) => state.user.currentUser!.name);

  const url = `${ROUTES.SETTINGS}/name`;
  return <LinkSettingThumbnail url={url} title="Name" value={name} isPointer />;
};
