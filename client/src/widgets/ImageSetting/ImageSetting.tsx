import type { FC } from 'react';
import { useState } from 'react';
import { useAppSelector } from '@shared/lib/hooks';
import { CropImage, DialogUpload, PicturesDND } from '@features/user';
import { Preview } from '@entities/user/components';
import { Tabs } from './components';
import styles from './ImageSetting.module.scss';

export const ImageSetting: FC = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const isDialogUploadOpen = useAppSelector(
    (state) => state.user.profileSetting.isDialogUploadOpen
  );
  const isImageCropOpen = useAppSelector(
    (state) => state.user.profileSetting.isImageCropOpen
  );

  const [isPreviewSetting, setIsPreviewSetting] = useState(false);
  const [isFullPreviewSetting, setIsFullPreviewSetting] = useState(false);

  return (
    <div className={styles.change}>
      {isFullPreviewSetting ? (
        <Preview
          user={currentUser}
          setIsFullPreview={setIsFullPreviewSetting}
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
                setIsFullPreview={setIsFullPreviewSetting}
              />
            ) : (
              <PicturesDND />
            )}
          </div>
        </>
      )}
      {isDialogUploadOpen && <DialogUpload />}
      {isImageCropOpen && <CropImage />}
    </div>
  );
};
