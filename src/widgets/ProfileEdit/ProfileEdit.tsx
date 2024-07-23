import { useState } from 'react';
import { ProfileSubmit } from '@features/user';
import { useUserPictures } from '@features/user';
import { Preview } from '@entities/user';
import { useAppSelector, useAdaptiveMediaQuery } from '@shared/lib/hooks';
import styles from './ProfileEdit.module.scss';
import { ProfileSettingWrapper } from './ui';

export const ProfileEdit = () => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const user = useAppSelector((state) => state.user.currentUser!);

  const [isFullPreview, setIsFullPreview] = useState(false);
  const [isPreviewTab, setIsPreviewTab] = useState(false);
  const { pictures, setPictures } = useUserPictures();

  const handleCloseFullPreview = () => {
    setIsFullPreview(false);
    setIsPreviewTab(true);
  };

  return (
    <div className={styles.change}>
      {isMobile && <ProfileSubmit isMobile pictures={pictures} />}
      {isFullPreview ? (
        <Preview user={user} setIsFullPreview={handleCloseFullPreview} isFull />
      ) : (
        <ProfileSettingWrapper
          pictures={pictures}
          setIsFullPreview={setIsFullPreview}
          isPreviewTab={isPreviewTab}
          setIsPreviewTab={setIsPreviewTab}
          setPictures={setPictures}
        />
      )}
    </div>
  );
};
