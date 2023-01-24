import defaultPhoto from '../../../assets/images/photos/1.jpg';

export const makeImageUrl = (userId?: string, avatarUrl?: string): string => {
  return avatarUrl && userId
    ? `http://localhost:5000/${userId}/avatar/${avatarUrl}`
    : defaultPhoto;
};
