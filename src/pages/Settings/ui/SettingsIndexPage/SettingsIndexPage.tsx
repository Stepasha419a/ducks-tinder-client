import { ProfilePreview } from '@widgets/ProfilePreview';
import { SettingsBlock } from '@features/SettingsBlock';
import { useAdaptiveMediaQuery } from '@shared/lib';

export const SettingsIndexPage = () => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <SettingsBlock />;
  }

  return <ProfilePreview />;
};
