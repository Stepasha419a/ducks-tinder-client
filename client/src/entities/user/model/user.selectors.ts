import { createSelector } from '@reduxjs/toolkit';

export const selectUserPairs = createSelector(
  [
    (state: RootState) => state.user.currentUser.pairs,
    (state: RootState) => state.user.pairs,
  ],
  (pairIds, pairs) => ({ pairIds, pairs })
);

export const selectUserChatsInfo = createSelector(
  [
    (state: RootState) => state.user.currentUser._id,
    (state: RootState) => state.user.currentUser.chats.length,
  ],
  (currentUserId, chatsLength) => ({ currentUserId, chatsLength })
);

export const selectCropImage = createSelector(
  [
    (state: RootState) => state.user.profileSetting.pictureVariant,
    (state: RootState) => state.user.profileSetting.imageURL,
  ],
  (pictureVariant, imageURL) => ({ pictureVariant, imageURL })
);

export const selectImagesDND = createSelector(
  [
    (state: RootState) => state.user.currentUser._id,
    (state: RootState) => state.user.currentUser.pictures,
  ],
  (currentUserId, pictures) => ({ currentUserId, pictures })
);
