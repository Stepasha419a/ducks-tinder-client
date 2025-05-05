import { ROUTES, useAppSelector } from '@ducks-tinder-client/common';

import { LinkSettingThumbnail } from '@entities/user';

export const FoodPreferenceSettingThumbnail = () => {
  const foodPreference = useAppSelector(
    (state) => state.user.currentUser!.foodPreference
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = foodPreference ? foodPreference : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Food preference"
      value={value as string}
      isPointer
    />
  );
};
