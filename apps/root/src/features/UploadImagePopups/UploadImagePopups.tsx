import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';

import {
  saveUserImageThunk,
  useAppDispatch,
} from '@ducks-tinder-client/common';

import { CropImage, DialogUpload } from './ui';

interface UploadImagePopupsProps {
  isUploadOpen: boolean;
  setIsUploadOpen: Dispatch<SetStateAction<boolean>>;
}

export const UploadImagePopups: FC<UploadImagePopupsProps> = ({
  isUploadOpen,
  setIsUploadOpen,
}) => {
  const dispatch = useAppDispatch();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageCropOpen, setIsImageCropOpen] = useState(false);

  const handleCloseImageCrop = () => {
    setIsImageCropOpen(false);
  };

  const handleCloseDialogUpload = () => {
    setIsUploadOpen(false);
  };

  const handleSubmitDialogUpload = (newImageUrl: string) => {
    setImageUrl(newImageUrl);
    setIsImageCropOpen(true);
    handleCloseDialogUpload();
  };

  const handleSubmit = (picture: Blob) => {
    dispatch(saveUserImageThunk(picture));
    handleCloseImageCrop();
  };

  return (
    <>
      {isUploadOpen && (
        <DialogUpload
          handleCloseDialogUpload={handleCloseDialogUpload}
          handleSubmit={handleSubmitDialogUpload}
        />
      )}
      {isImageCropOpen && (
        <CropImage
          handleCloseImageCrop={handleCloseImageCrop}
          handleSubmit={handleSubmit}
          imageUrl={imageUrl}
        />
      )}
    </>
  );
};
