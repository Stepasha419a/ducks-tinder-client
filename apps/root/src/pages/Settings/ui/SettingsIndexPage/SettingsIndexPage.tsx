import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { ProfilePreview } from '@widgets/ProfilePreview';
import { SettingsBlock } from '@features/SettingsBlock';

export const SettingsIndexPage = () => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <SettingsBlock />;
  }

  return <ProfilePreview />;
};
