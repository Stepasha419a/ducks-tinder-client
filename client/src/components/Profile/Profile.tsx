import { useState } from 'react';
import { UserImage } from './components';
import { ImageSetting } from './components/ImageSetting/ImageSetting';
import styles from './Profile.module.scss';

export const Profile = () => {
  const [isImageSetting, setIsImageSetting] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        {isImageSetting ? (
          <ImageSetting setIsImageSetting={setIsImageSetting} />
        ) : (
          <UserImage setIsImageSetting={setIsImageSetting} />
        )}
      </div>
    </div>
  );
};
