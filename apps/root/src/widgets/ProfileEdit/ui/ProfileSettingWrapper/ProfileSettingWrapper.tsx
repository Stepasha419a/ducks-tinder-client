import type { Dispatch, FC, SetStateAction } from 'react';

import type { Picture } from '@ducks-tinder-client/common';
import { Preview } from '@ducks-tinder-client/ui';

import { ProfileSettingBlock, Tabs } from './components';
import * as styles from './ProfileSettingWrapper.module.scss';
import { useUserStore } from '@ducks-tinder-client/auth';

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
  const user = useUserStore((state) => state.currentUser);

  if (!user) {
    return null;
  }

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
