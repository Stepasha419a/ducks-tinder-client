import type { FC, ReactElement } from 'react';
import { useState } from 'react';
import { ImageSetting, PlaceSetting } from '@widgets';
import { UserImage } from './components';
import styles from './ProfilePage.module.scss';
import { useAppSelector } from '@/shared/hooks';

const ProfilePage: FC = (): ReactElement => {
  const [isImageSetting, setIsImageSetting] = useState(false);

  const isPlaceSetting =
    useAppSelector((state) => state.setting.settingInputName) === 'place';

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        {isPlaceSetting ? (
          <PlaceSetting />
        ) : isImageSetting ? (
          <ImageSetting setIsImageSetting={setIsImageSetting} />
        ) : (
          <UserImage setIsImageSetting={setIsImageSetting} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
