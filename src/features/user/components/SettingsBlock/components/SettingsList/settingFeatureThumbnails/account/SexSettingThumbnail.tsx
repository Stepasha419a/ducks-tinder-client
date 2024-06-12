import { ROUTES } from '@shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/user/components';
import { useAppSelector } from '@shared/lib/hooks';
import { SettingNameEnum } from '@/entities/user/lib';

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
