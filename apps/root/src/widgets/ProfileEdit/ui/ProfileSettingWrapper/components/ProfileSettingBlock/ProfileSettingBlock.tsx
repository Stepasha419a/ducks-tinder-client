import type { Dispatch, FC, SetStateAction } from 'react';

import type { Picture } from '@ducks-tinder-client/common';
import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import { PicturesDND } from '@features/PicturesDND';
import { ProfileSettingsList } from '@features/ProfileSettingsList';
import { ProfileSubmit } from '@features/ProfileSubmit';

import * as styles from './ProfileSettingBlock.module.scss';
import { useTranslation } from 'react-i18next';
import { useImageUpload } from '@features/CropImage';

interface ProfileSettingProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
}

export const ProfileSettingBlock: FC<ProfileSettingProps> = ({
  pictures,
  setPictures,
}) => {
  const { t } = useTranslation();

  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const { handleUploadImage } = useImageUpload();

  return (
    <div className={styles.change}>
      <PicturesDND
        handleOpenUpload={handleUploadImage}
        pictures={pictures}
        setPictures={setPictures}
      />
      <div className={styles.descr}>{t('profile.addMorePhotos')}</div>
      <ProfileSettingsList />
      {!isMobile && <ProfileSubmit pictures={pictures} />}
    </div>
  );
};
