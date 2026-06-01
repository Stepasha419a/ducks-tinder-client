import { useState } from 'react';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { Preview } from '@ducks-tinder-client/ui';

import { ProfileSubmit } from '@features/ProfileSubmit';

import { useUserPictures } from './lib';
import { ProfileSettingWrapper } from './ui';
import * as styles from './ProfileEdit.module.scss';
import { useUserStore } from '@ducks-tinder-client/auth';

export const ProfileEdit = () => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const user = useUserStore((state) => state.currentUser);

  const [isFullPreview, setIsFullPreview] = useState(false);
  const [isPreviewTab, setIsPreviewTab] = useState(false);
  const { pictures, setPictures } = useUserPictures();

  const handleCloseFullPreview = () => {
    setIsFullPreview(false);
    setIsPreviewTab(true);
  };

  if (!user) {
    return null;
  }

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
