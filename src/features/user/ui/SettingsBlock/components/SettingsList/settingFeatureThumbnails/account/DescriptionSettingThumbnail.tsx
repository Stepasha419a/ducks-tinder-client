import { LinkSettingThumbnail } from '@entities/user';
import { SettingNameEnum } from '@entities/user';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';

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
