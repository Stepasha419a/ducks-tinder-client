import type { Picture } from '@ducks-tinder-client/common';
import type { Dispatch, FC, SetStateAction } from 'react';
import { Preview } from '@entities/user';
import { useAppSelector } from '@shared/lib';
import { ProfileSettingBlock, Tabs } from './components';
import styles from './ProfileSettingWrapper.module.scss';

interface ProfileSettingWrapperProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
  setIsPreviewTab: Dispatch<SetStateAction<boolean>>;
  isPreviewTab: boolean;
  setIsFullPreview: Dispatch<SetStateAction<boolean>>;
}

export const ProfileSettingWrapper: FC<ProfileSettingWrapperProps> = ({
  pictures,
  setPictures,
  setIsPreviewTab,
  isPreviewTab,
  setIsFullPreview,
}) => {
  const user = useAppSelector((state) => state.user.currentUser!);

  return (
    <>
      <Tabs isPreviewTab={isPreviewTab} setIsPreviewTab={setIsPreviewTab} />
      <div className={styles.panel}>
        {isPreviewTab ? (
          <Preview user={user} setIsFullPreview={setIsFullPreview} />
        ) : (
          <ProfileSettingBlock pictures={pictures} setPictures={setPictures} />
        )}
      </div>
    </>
  );
};
