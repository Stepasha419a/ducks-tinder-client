import type { FC, ReactElement } from 'react';
import { useState } from 'react';
import { ImageSetting, Nav } from '@widgets';
import { UserImage } from './components';
import { withPrivatePageHocs } from '@hocs';
import styles from './ProfilePage.module.scss';

const ProfilePage: FC = (): ReactElement => {
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

export default withPrivatePageHocs(ProfilePage);
