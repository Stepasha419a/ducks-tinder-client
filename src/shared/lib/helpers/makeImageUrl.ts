import defaultPhoto from '@shared/assets/images/default-duck.png';

export function makeImageUrl(userId?: string, avatarUrl?: string): string {
  return avatarUrl && userId
    ? `http://localhost:5000/${userId}/${avatarUrl}`
    : defaultPhoto;
}
