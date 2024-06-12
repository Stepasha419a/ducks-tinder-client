import { SettingNameEnum } from '@entities/user/lib';
import { LinkSettingThumbnail } from '@entities/user/ui';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';

export const SexSettingThumbnail = () => {
  const sex = useAppSelector((state) => state.user.currentUser!.sex);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/sex`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Sex"
      value={sex || 'unknown'}
      isPointer
      isError={errorFields.includes(SettingNameEnum.SEX)}
    />
  );
};
