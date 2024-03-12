import type { User } from '@shared/api/interfaces';

export interface UserInitialState {
  currentUser: User;
  profileSetting: {
    imageURL: string | null;
    isImageCropOpen: boolean;
    isDialogUploadOpen: boolean;
  };
}
