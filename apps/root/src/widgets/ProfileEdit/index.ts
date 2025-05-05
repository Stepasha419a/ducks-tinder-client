import { WithErrorFallback } from '@ducks-tinder-client/common';

import { ProfileEdit as ProfileEditRaw } from './ProfileEdit';

export const ProfileEdit = WithErrorFallback(ProfileEditRaw);
