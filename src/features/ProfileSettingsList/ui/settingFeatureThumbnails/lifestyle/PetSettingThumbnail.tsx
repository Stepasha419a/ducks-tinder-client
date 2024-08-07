import { LinkSettingThumbnail } from '@entities/user';
import { ROUTES } from '@shared/lib';
import { useAppSelector } from '@shared/lib';

export const PetSettingThumbnail = () => {
  const pet = useAppSelector((state) => state.user.currentUser!.pet);

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = pet ? pet : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Pets"
      value={value as string}
      isPointer
    />
  );
};
