import { WithErrorFallback } from '@ducks-tinder-client/common';

import { ProfilePreview as ProfilePreviewRaw } from './ui/ProfilePreview';

export const ProfilePreview = WithErrorFallback(ProfilePreviewRaw);
