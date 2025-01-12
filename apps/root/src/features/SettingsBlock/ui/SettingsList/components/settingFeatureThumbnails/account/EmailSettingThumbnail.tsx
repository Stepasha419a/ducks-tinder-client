import { LinkSettingThumbnail } from '@entities/user';
import { ROUTES } from '@shared/lib';
import { useAppSelector } from '@shared/lib';

export const EmailSettingThumbnail = () => {
  const email = useAppSelector((state) => state.auth.authData!.email);

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
