import { LinkSettingThumbnail } from '@/entities/user/ui';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const SocialNetworksActivitySettingThumbnail = () => {
  const socialNetworksActivity = useAppSelector(
    (state) => state.user.currentUser!.socialNetworksActivity
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = socialNetworksActivity ? socialNetworksActivity : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Social media"
      value={value as string}
      isPointer
    />
  );
};
