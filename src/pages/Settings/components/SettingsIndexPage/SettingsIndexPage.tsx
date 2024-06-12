import { SettingsBlock } from '@features/user/ui';
import { useMediaQuery } from '@shared/lib/hooks';
import { ProfilePreview } from '@widgets/ui';

export const SettingsIndexPage = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <SettingsBlock />;
  }

  return <ProfilePreview />;
};
