import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useAppSelector } from '@hooks';
import type { PicturesVariants } from '@shared/api/interfaces';
import { CropImage, DialogUpload, ImagesForm } from '@features/user';
import { Preview } from '@entities/user/components';
import { Tabs } from './components';
import styles from './ImageSetting.module.scss';

interface ImageSettingProps {
  setIsImageSetting: (isImageSetting: boolean) => void;
}

//TODO: decompose all logic to the self popups, there is necessary to think about creating profileReducer to contain settingsReducer also 
export const ImageSetting: FC<ImageSettingProps> = ({ setIsImageSetting }) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [isPreviewSetting, setIsPreviewSetting] = useState(false);
  const [isFullPreviewPageSetting, setIsFullPreviewPageSetting] =
    useState(false);
  const [isImageCropOpen, setIsImageCropOpen] = useState(false);
  const [isDialogUploadOpen, setIsDialogUploadOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [setting, setSetting] = useState<PicturesVariants | ''>('');

  const openSettingHandler = (variant: PicturesVariants): void => {
    setSetting(variant);
    setIsDialogUploadOpen(true);
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsDialogUploadOpen(false);
    const image = e.target.files![0];
    setImageURL(URL.createObjectURL(image));
    setIsImageCropOpen(true);
  };

  return (
    <div className={styles.change}>
      {isFullPreviewPageSetting ? (
        <Preview
          user={currentUser}
          setIsFullPreview={setIsFullPreviewPageSetting}
          isFull
        />
      ) : (
        <>
          <Tabs
            isPreviewSetting={isPreviewSetting}
            setIsPreviewSetting={setIsPreviewSetting}
          />
          <div className={styles.panel}>
            {isPreviewSetting ? (
              <Preview
                user={currentUser}
                setIsFullPreview={setIsFullPreviewPageSetting}
              />
            ) : (
              <ImagesForm
                currentUser={currentUser}
                setIsImageSetting={setIsImageSetting}
                openSettingHandler={openSettingHandler}
              />
            )}
          </div>
        </>
      )}
      {isDialogUploadOpen && (
        <DialogUpload
          onImageChange={onImageChange}
          setIsDialogUploadOpen={setIsDialogUploadOpen}
        />
      )}
      {isImageCropOpen && (
        <CropImage
          setIsImageCropOpen={setIsImageCropOpen}
          imageURL={imageURL}
          currentUser={currentUser}
          setting={setting}
          setSetting={setSetting}
        />
      )}
    </div>
  );
};
