import { type Dispatch, type FC, type SetStateAction, useState } from 'react';

import type { Picture } from '@ducks-tinder-client/common';
import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import { PicturesDND } from '@features/PicturesDND';
import { ProfileSettingsList } from '@features/ProfileSettingsList';
import { ProfileSubmit } from '@features/ProfileSubmit';
import { UploadImagePopups } from '@features/UploadImagePopups';

import * as styles from './ProfileSettingBlock.module.scss';
import { useTranslation } from 'react-i18next';

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
      <div className={styles.descr}>{t('profile.addMorePhotos')}</div>
      <ProfileSettingsList />
      {!isMobile && <ProfileSubmit pictures={pictures} />}

      <UploadImagePopups
        isUploadOpen={isUploadOpen}
        setIsUploadOpen={setIsUploadOpen}
      />
    </div>
  );
};
