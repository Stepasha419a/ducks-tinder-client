import defaultPhoto from '../../../assets/images/default-duck.png';

export const makeImageUrl = (
  userId?: string,
  avatarUrl?: string,
  dir: 'avatar' | 'gallery' = 'avatar'
): string => {
  return avatarUrl && userId
    ? `http://localhost:5000/${userId}/${dir}/${avatarUrl}`
    : defaultPhoto;
};
