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

export const selectPreviewUser = createSelector(
  [
    (state: RootState) => state.user.currentUser.id,
    (state: RootState) => state.user.currentUser.name,
    (state: RootState) => state.user.currentUser.description,
    (state: RootState) => state.user.currentUser.age,
    (state: RootState) => state.user.currentUser.place,
    (state: RootState) => state.user.currentUser.distance,
    (state: RootState) => state.user.currentUser.interests,
    (state: RootState) => state.user.currentUser.attentionSign,
    (state: RootState) => state.user.currentUser.childrenAttitude,
    (state: RootState) => state.user.currentUser.communicationStyle,
    (state: RootState) => state.user.currentUser.education,
    (state: RootState) => state.user.currentUser.personalityType,
    (state: RootState) => state.user.currentUser.zodiacSign,
    (state: RootState) => state.user.currentUser.pictures,
  ],
  (
    id,
    name,
    description,
    age,
    place,
    distance,
    interests,
    attentionSign,
    childrenAttitude,
    communicationStyle,
    education,
    personalityType,
    zodiacSign,
    pictures
  ) => ({
    id,
    name,
    description,
    age,
    place,
    distance,
    interests,
    attentionSign,
    childrenAttitude,
    communicationStyle,
    education,
    personalityType,
    zodiacSign,
    pictures,
  })
);
