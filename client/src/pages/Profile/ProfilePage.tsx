import type { FC, ReactElement } from 'react';
import { useState } from 'react';
import { ImageSetting, Nav, PlaceSetting } from '@widgets';
import { UserImage } from './components';
import { withPrivatePageHocs } from '@hocs';
import styles from './ProfilePage.module.scss';
import { useAppSelector } from '@/shared/hooks';

const ProfilePage: FC = (): ReactElement => {
  const [isImageSetting, setIsImageSetting] = useState(false);

  const isPlaceSetting =
    useAppSelector((state) => state.setting.settingInputName) === 'place';

  return (
    <div className={styles.main}>
      <Nav />
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            {isImageSetting ? (
              <ImageSetting setIsImageSetting={setIsImageSetting} />
            ) : isPlaceSetting ? (
              <PlaceSetting />
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
