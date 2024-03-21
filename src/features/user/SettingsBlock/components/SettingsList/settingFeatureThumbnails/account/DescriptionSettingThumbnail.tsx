import { ROUTES } from '@shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/user/components';
import { useAppSelector } from '@shared/lib/hooks';
import { SettingNameEnum } from '@/entities/user/model/user/user.interface';

export const DescriptionSettingThumbnail = () => {
  const description = useAppSelector(
    (state) => state.user.currentUser!.description
  );
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.settings}/description`;
  return (
    <LinkSettingThumbnail
      url={url}
      title="Description"
      value={description || 'unknown'}
      isPointer
      isError={errorFields.includes(SettingNameEnum.DESCRIPTION)}
      isOverflow
    />
  );
};
