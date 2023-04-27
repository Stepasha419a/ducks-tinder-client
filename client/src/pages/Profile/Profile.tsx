import type { ReactElement } from 'react';
import { useState } from 'react';
import { ImageSetting, Nav } from '@widgets';
import { UserImage } from './components';
import styles from './Profile.module.scss';

export const Profile = (): ReactElement => {
  const [isImageSetting, setIsImageSetting] = useState(false);

  return (
    <div className={styles.main}>
      <Nav />
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            {isImageSetting ? (
              <ImageSetting setIsImageSetting={setIsImageSetting} />
            ) : (
              <UserImage setIsImageSetting={setIsImageSetting} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
