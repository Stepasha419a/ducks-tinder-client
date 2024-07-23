import type { Dispatch, FC, SetStateAction } from 'react';
import { ProfileSettingBlock } from '@widgets';
import { Preview } from '@entities/user';
import type { Picture } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/lib/hooks';
import styles from './ProfileSettingWrapper.module.scss';
import { Tabs } from './ui';

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
