import { LinkSettingThumbnail } from '@/entities/user/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const ChronotypeSettingThumbnail = () => {
  const chronotype = useAppSelector(
    (state) => state.user.currentUser.chronotype
  );

  const url = `${ROUTES.profile}/edit/lifestyle`;
  const value = chronotype ? chronotype : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Chronotype"
      value={value}
      isPointer
    />
  );
};
