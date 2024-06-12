import { LinkSettingThumbnail } from '@/entities/user/ui';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

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
