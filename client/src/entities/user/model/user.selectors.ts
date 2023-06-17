import { createSelector } from '@reduxjs/toolkit';

export const selectCropImage = createSelector(
  [(state: RootState) => state.user.profileSetting.imageURL],
  (imageURL) => ({ imageURL })
);

export const selectImagesDND = createSelector(
  [
    (state: RootState) => state.user.currentUser.id,
    (state: RootState) => state.user.currentUser.pictures,
  ],
  (currentUserId, pictures) => ({ currentUserId, pictures })
);
