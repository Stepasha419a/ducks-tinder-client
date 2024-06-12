import { ROUTES } from '@shared/lib/constants';
import { LinkSettingThumbnail } from '@entities/user/ui';
import { useAppSelector } from '@shared/lib/hooks';
import { SettingNameEnum } from '@entities/user/lib';

export const DescriptionSettingThumbnail = () => {
  const description = useAppSelector(
    (state) => state.user.currentUser!.description
  );
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const url = `${ROUTES.SETTINGS}/description`;
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
