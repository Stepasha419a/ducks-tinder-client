import { ProfilePreview } from '@widgets';
import { SettingsBlock } from '@features/user';
import { useMediaQuery } from '@shared/lib/hooks';



export const SettingsIndexPage = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <SettingsBlock />;
  }

  return <ProfilePreview />;
};
