import type { FC } from 'react';
import { useState } from 'react';
import { useAppSelector, useMediaQuery } from '@shared/lib/hooks';
import { CropImage, DialogUpload, PicturesDND } from '@features/user';
import { selectPreviewUser } from '@/entities/user/model';
import { Preview } from '@entities/user/components';
import { Tabs } from './components';
import styles from './ImageSetting.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants';

export const ImageSetting: FC = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const previewUser = useAppSelector(selectPreviewUser);
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
      {isMobile && (
        <div className={styles.head}>
          <div className={styles.title}>Edit profile</div>
          <Link to={ROUTES.profile} className={styles.submit}>
            Submit
          </Link>
        </div>
      )}
      {isFullPreviewSetting ? (
        <Preview
          user={previewUser}
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
                user={previewUser}
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
