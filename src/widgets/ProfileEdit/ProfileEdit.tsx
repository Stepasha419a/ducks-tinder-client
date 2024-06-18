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

  const [isFullPreviewSetting, setIsFullPreviewSetting] = useState(false);
  const { pictures, setPictures } = useUserPictures();

  return (
    <div className={styles.change}>
      {isMobile && <ProfileSubmit isMobile pictures={pictures} />}
      {isFullPreviewSetting ? (
        <Preview
          user={user}
          setIsFullPreview={setIsFullPreviewSetting}
          isFull
        />
      ) : (
        <ProfileSettingWrapper
          pictures={pictures}
          setIsFullPreviewSetting={setIsFullPreviewSetting}
          setPictures={setPictures}
        />
      )}
    </div>
  );
};
