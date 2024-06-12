import { SettingsBlock } from '@/features/user/components';
import { useMediaQuery } from '@shared/lib/hooks';
import { ProfilePreview } from '@widgets';

export const SettingsIndexPage = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <SettingsBlock />;
  }

  return <ProfilePreview />;
};
