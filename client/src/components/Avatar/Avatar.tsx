import defaultPhoto from '../../assets/images/photos/1.jpg';
import { useEffect, useState } from 'react';
import { IUserUnrequired } from '../../models/IUser';
import styles from './Avatar.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/reduxStore';

interface AvatarInterface {
  otherUserId?: string;
  imageExtraClassName?: string;
  showDefaultPhoto?: boolean;
  avatarUrl?: string;
}

const Avatar: React.FC<AvatarInterface> = ({
  otherUserId,
  imageExtraClassName,
  showDefaultPhoto,
  avatarUrl,
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(
    (state) => state.usersPage.currentUser
  );

  const [otherUser, setOtherUser] = useState<(IUserUnrequired & { _id: string }) | null>(
    null
  );

  useEffect(() => {
    if (otherUserId && avatarUrl) {
      setOtherUser({ _id: otherUserId, pictures: { avatar: avatarUrl } });
    }
  }, [otherUserId, avatarUrl, dispatch]);

  if (
    (otherUserId && !otherUser?.pictures?.avatar) ||
    (!currentUser.pictures.avatar && !otherUser && otherUserId) ||
    (!currentUser.pictures.avatar && !otherUserId) ||
    showDefaultPhoto
  ) {
    return (
      <div
        style={{ backgroundImage: `url(${defaultPhoto})` }}
        className={`${styles.image} ${
          imageExtraClassName ? styles[`image${imageExtraClassName}`] : ''
        }`}
      ></div>
    );
  }

  return (
    <div>
      {otherUser ? (
        <div
          style={{
            backgroundImage: `url(http://localhost:5000/${otherUser._id}/avatar/${otherUser.pictures?.avatar})`,
          }}
          className={`${styles.image} ${
            imageExtraClassName ? styles[`image${imageExtraClassName}`] : ''
          }`}
        ></div>
      ) : (
        currentUser && (
          <div
            style={{
              backgroundImage: `url(http://localhost:5000/${currentUser._id}/avatar/${currentUser.pictures.avatar})`,
            }}
            className={`${styles.image} ${
              imageExtraClassName ? styles[`image${imageExtraClassName}`] : ''
            }`}
          ></div>
        )
      )}
    </div>
  );
};

export default Avatar;
