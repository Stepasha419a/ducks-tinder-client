import type { ReactElement } from 'react';
import { useState } from 'react';
import { ImageSetting, UserImage } from './components';
import styles from './Profile.module.scss';

export const Profile = (): ReactElement => {
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
