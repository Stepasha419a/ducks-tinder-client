import { ROUTES } from '@shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/user/ui';
import { useAppSelector } from '@shared/lib/hooks';

export const EmailSettingThumbnail = () => {
  const email = useAppSelector((state) => state.user.currentUser!.email);

  const url = `${ROUTES.SETTINGS}/email`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Email"
      value={email}
      isPointer
      isOverflow
    />
  );
};
