import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../redux/store';
import ImageSlider from '../../Slider/ImageSlider/ImageSlider';
import { Button } from '../../ui';
import styles from './UserImage.module.scss';

interface UserImagePropsInterface {
  setIsImageSetting: (isImageSetting: boolean) => void;
}

const UserImage: React.FC<UserImagePropsInterface> = ({
  setIsImageSetting,
}) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  return (
    <>
      <div className={styles.slider}>
        <ImageSlider
          images={[
            currentUser.pictures.avatar,
            ...currentUser.pictures.gallery,
          ]}
          userId={currentUser._id}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.descr}>
          <div className={styles.name}>
            {currentUser.name}
            <span className={styles.years}>{currentUser.age}</span>
          </div>
          <div className={styles.sex}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            {currentUser.sex}
          </div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.edit}>
          <Button
            onClick={() => setIsImageSetting(true)}
            variant="gradient"
            extraClassName={styles.btn}
          >
            Edit Info
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserImage;
