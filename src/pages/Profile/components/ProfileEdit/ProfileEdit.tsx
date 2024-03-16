import { useState } from 'react';
import { useAppSelector, useMediaQuery } from '@shared/lib/hooks';
import { Preview } from '@entities/user/components';
import { useUserPictures } from '@features/user/PicturesDND/lib';
import { ProfileSettingWrapper } from './components';
import styles from './ProfileEdit.module.scss';
import { ProfileSubmit } from '@features/user';

export const ProfileEdit = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

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
