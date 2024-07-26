import { LinkSettingThumbnail } from '@entities/user';
import { ROUTES } from '@shared/lib';
import { useAppSelector } from '@shared/lib';

export const NameSettingThumbnail = () => {
  const name = useAppSelector((state) => state.user.currentUser!.name);

  const url = `${ROUTES.SETTINGS}/name`;
  return <LinkSettingThumbnail url={url} title="Name" value={name} isPointer />;
};
