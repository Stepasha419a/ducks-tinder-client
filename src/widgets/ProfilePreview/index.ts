import { WithErrorFallback } from '@shared/lib';
import { ProfilePreview as ProfilePreviewRaw } from './ui/ProfilePreview';

export const ProfilePreview = WithErrorFallback(ProfilePreviewRaw);
