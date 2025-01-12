import { WithErrorFallback } from '@shared/lib';
import { ProfileEdit as ProfileEditRaw } from './ProfileEdit';

export const ProfileEdit = WithErrorFallback(ProfileEditRaw);
