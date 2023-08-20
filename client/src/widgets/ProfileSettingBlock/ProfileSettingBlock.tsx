import type { Dispatch, FC, SetStateAction } from 'react';
import type { Picture } from '@/shared/api/interfaces';
import { useMediaQuery } from '@/shared/lib/hooks';
import {
  PicturesDND,
  ProfileSettingsList,
  ProfileSubmit,
} from '@/features/user';
import styles from './ProfileSettingBlock.module.scss';

interface ProfileSettingProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
}

export const ProfileSettingBlock: FC<ProfileSettingProps> = ({
  pictures,
  setPictures,
}) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <div className={styles.change}>
      <PicturesDND pictures={pictures} setPictures={setPictures} />
      <div className={styles.descr}>
        Add more photos to fill out your profile
        <br />
        by another 4% and get more likes.
      </div>
      <ProfileSettingsList />
      {!isMobile && <ProfileSubmit pictures={pictures} />}
    </div>
  );
};
