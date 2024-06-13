import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Picture } from '@shared/api/interfaces';
import { ROUTES } from '@shared/lib/constants';
import { Button } from '@shared/ui';
import { usePicturesMix } from '../../lib';
import styles from './ProfileSubmit.module.scss';
import { ProfileSubmitMobile } from './ui';

interface ProfileSubmitProps {
  pictures: Picture[];
  isMobile?: boolean;
}

export const ProfileSubmit: FC<ProfileSubmitProps> = ({
  pictures,
  isMobile,
}) => {
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
          Save changes
        </Button>
      </Link>
    </div>
  );
};
