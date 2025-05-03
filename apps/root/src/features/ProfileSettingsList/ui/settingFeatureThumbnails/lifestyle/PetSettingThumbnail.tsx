import { ROUTES , useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';

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
