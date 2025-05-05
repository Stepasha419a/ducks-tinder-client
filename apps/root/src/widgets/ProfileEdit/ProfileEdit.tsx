import { useState } from 'react';

import {
  useAdaptiveMediaQuery,
  useAppSelector,
} from '@ducks-tinder-client/common';
import { Preview } from '@ducks-tinder-client/ui';

import { ProfileSubmit } from '@features/ProfileSubmit';

import { useUserPictures } from './lib';
import { ProfileSettingWrapper } from './ui';
import styles from './ProfileEdit.module.scss';

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
