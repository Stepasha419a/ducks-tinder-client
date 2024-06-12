import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import type { Picture } from '@shared/api/interfaces';
import { useMediaQuery } from '@shared/lib/hooks';
import { PicturesDND, ProfileSubmit } from '@/features/user/ui';
import { ProfileSettingsList } from '@/features/user/ui';
import styles from './ProfileSettingBlock.module.scss';
import { UploadImagePopups } from '@/features/user/ui/UploadImagePopups/UploadImagePopups';

interface ProfileSettingProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
}

export const ProfileSettingBlock: FC<ProfileSettingProps> = ({
  pictures,
  setPictures,
}) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleOpenUpload = () => {
    setIsUploadOpen(true);
  };

  return (
    <div className={styles.change}>
      <PicturesDND
        handleOpenUpload={handleOpenUpload}
        pictures={pictures}
        setPictures={setPictures}
      />
      <div className={styles.descr}>
        Add more photos to fill out your profile
        <br />
        by another 4% and get more likes.
      </div>
      <ProfileSettingsList />
      {!isMobile && <ProfileSubmit pictures={pictures} />}

      <UploadImagePopups
        isUploadOpen={isUploadOpen}
        setIsUploadOpen={setIsUploadOpen}
      />
    </div>
  );
};
