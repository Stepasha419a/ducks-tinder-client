export { userReducer, setCurrentUser, checkFields } from './user.slice';
export {
  getCurrentUser,
  updateUserThunk,
  updateUserPlaceThunk,
  saveUserImageThunk,
  deleteUserPictureThunk,
  mixUserPicturesThunk,
} from './user.thunks';
export { selectAvatar } from './user.selectors';
export * from './user.interface';
