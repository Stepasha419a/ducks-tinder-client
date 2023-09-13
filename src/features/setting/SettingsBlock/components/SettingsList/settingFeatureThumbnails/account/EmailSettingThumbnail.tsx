import { ROUTES } from '@shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/setting/components';
import { useAppSelector } from '@shared/lib/hooks';

export const EmailSettingThumbnail = () => {
  const email = useAppSelector((state) => state.user.currentUser.email);

  const url = `${ROUTES.settings}/email`;
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
