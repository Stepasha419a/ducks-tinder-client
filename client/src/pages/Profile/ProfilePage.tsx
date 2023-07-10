import type { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ProfilePage.module.scss';

const ProfilePage: FC = (): ReactElement => {
  /* const isPlaceSetting =
    useAppSelector((state) => state.setting.settingInputName) === 'place'; */

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <Outlet />
        {/* {isPlaceSetting ? (
          <PlaceSetting />
        ) : isImageSetting ? (
          <ImageSetting setIsImageSetting={setIsImageSetting} />
        ) : (
          <UserImage setIsImageSetting={setIsImageSetting} />
        )} */}
      </div>
    </div>
  );
};

export default ProfilePage;
