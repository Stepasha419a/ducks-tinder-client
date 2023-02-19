import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import defaultPhoto from '../../../../assets/images/photos/1.jpg';
import styles from './PairBlock.module.scss';
import { IUser } from '../../../../models/IUser';
import { useAppSelector } from '../../../../redux/store';

interface IPairBlock {
  firstPair: IUser;
}

export const PairBlock: React.FC<IPairBlock> = ({ firstPair }) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  return (
    <div className={styles.pairs}>
      <Link className={styles.link} to="/pairs">
        <div
          style={{
            backgroundImage: `url(${
              firstPair.pictures.avatar
                ? `http://localhost:5000/${firstPair._id}/avatar/` +
                  firstPair.pictures.avatar
                : defaultPhoto
            })`,
          }}
          className={styles.content}
        >
          <div className={styles.likes}>{currentUser.pairs.length}</div>
          <div className={styles.text}>{currentUser.pairs.length} likes</div>
          <FontAwesomeIcon
            icon={faHeartCircleExclamation}
            className={styles.icon}
          />
        </div>
      </Link>
    </div>
  );
};

export default PairBlock;
