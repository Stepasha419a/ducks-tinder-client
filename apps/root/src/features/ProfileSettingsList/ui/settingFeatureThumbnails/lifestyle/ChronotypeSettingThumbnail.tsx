import { ROUTES } from '@ducks-tinder-client/common';
import { LinkSettingThumbnail } from '@entities/user';
import { useAppSelector } from '@shared/lib';

export const ChronotypeSettingThumbnail = () => {
  const chronotype = useAppSelector(
    (state) => state.user.currentUser!.chronotype
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = chronotype ? chronotype : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Chronotype"
      value={value as string}
      isPointer
    />
  );
};
