import defaultPhoto from '../../../assets/images/photos/default.jpg';

export const makeImageUrl = (
  userId?: string,
  avatarUrl?: string,
  dir: 'avatar' | 'gallery' = 'avatar'
): string => {
  return avatarUrl && userId
    ? `http://localhost:5000/${userId}/${dir}/${avatarUrl}`
    : defaultPhoto;
};
