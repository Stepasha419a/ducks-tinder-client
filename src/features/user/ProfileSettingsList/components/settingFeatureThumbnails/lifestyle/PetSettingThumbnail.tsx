import { LinkSettingThumbnail } from '@/entities/user/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const PetSettingThumbnail = () => {
  const pet = useAppSelector((state) => state.user.currentUser.pet);

  const url = `${ROUTES.profile}/edit/lifestyle`;
  const value = pet ? pet : 'Add';

  return (
    <LinkSettingThumbnail url={url} title="Pets" value={value} isPointer />
  );
};
