import { ProfilePreview } from '@widgets/ui';
import { SettingsBlock } from '@features/user/ui';
import { useMediaQuery } from '@shared/lib/hooks';

export const SettingsIndexPage = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <SettingsBlock />;
  }

  return <ProfilePreview />;
};
