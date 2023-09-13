import type { FC } from 'react';
import { ROUTES } from '@shared/lib/constants';
import type { Picture } from '@shared/api/interfaces';
import { Link } from 'react-router-dom';
import { usePicturesMix } from '../PicturesDND/lib';
import styles from './ProfileSubmit.module.scss';
import { ProfileSubmitMobile } from './mobile/ProfileSubmit.mobile';
import { Button } from '@shared/ui';

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
      <Link to={ROUTES.profile}>
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
