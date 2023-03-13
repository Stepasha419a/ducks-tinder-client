import { useAppSelector } from '../../../hooks';
import { Preview } from '../../Preview/Preview';
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
      <Preview
        user={currentUser}
        isFull
        extraClassName={styles.padding}
        setIsFullPreview={() => setIsImageSetting(true)}
      />
      <div className={styles.edit}>
        <Button
          onClick={() => setIsImageSetting(true)}
          variant="gradient"
          extraClassName={styles.btn}
        >
          Edit Info
        </Button>
      </div>
    </>
  );
};

export default UserImage;
