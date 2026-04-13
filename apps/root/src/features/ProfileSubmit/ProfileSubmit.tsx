import type { FC } from 'react';
import { Link } from 'react-router-dom';

import type { Picture } from '@ducks-tinder-client/common';
import { ROUTES } from '@ducks-tinder-client/common';
import { Button } from '@ducks-tinder-client/ui';

import { usePicturesMix } from './lib';
import { ProfileSubmitMobile } from './ui';
import * as styles from './ProfileSubmit.module.scss';
import { useTranslation } from 'react-i18next';

interface ProfileSubmitProps {
  pictures: Picture[];
  isMobile?: boolean;
}

export const ProfileSubmit: FC<ProfileSubmitProps> = ({
  pictures,
  isMobile,
}) => {
  const { t } = useTranslation();

  const handleMixPictures = usePicturesMix();
  const handleSubmit = () => {
    handleMixPictures(pictures);
  };

  if (isMobile) {
    return <ProfileSubmitMobile handleSubmit={handleSubmit} />;
  }

  return (
    <div className={styles.save}>
      <Link to={ROUTES.PROFILE}>
        <Button
          onClick={handleSubmit}
          variant="gradient"
          extraClassName={styles.btn}
        >
          {t('saveChanges')}
        </Button>
      </Link>
    </div>
  );
};
