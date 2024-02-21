import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import type { Picture } from '@shared/api/interfaces';
import { Preview } from '@entities/user/components';
import { Tabs } from './components';
import { ProfileSettingBlock } from '@widgets';
import { useAppSelector } from '@shared/lib/hooks';
import styles from './ProfileSettingWrapper.module.scss';

interface ProfileSettingWrapperProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
  setIsFullPreviewSetting: Dispatch<SetStateAction<boolean>>;
}

export const ProfileSettingWrapper: FC<ProfileSettingWrapperProps> = ({
  pictures,
  setPictures,
  setIsFullPreviewSetting,
}) => {
  const user = useAppSelector((state) => state.user.currentUser);

  const [isPreviewSetting, setIsPreviewSetting] = useState(false);

  return (
    <>
      <Tabs
        isPreviewSetting={isPreviewSetting}
        setIsPreviewSetting={setIsPreviewSetting}
      />
      <div className={styles.panel}>
        {isPreviewSetting ? (
          <Preview user={user} setIsFullPreview={setIsFullPreviewSetting} />
        ) : (
          <ProfileSettingBlock pictures={pictures} setPictures={setPictures} />
        )}
      </div>
    </>
  );
};
