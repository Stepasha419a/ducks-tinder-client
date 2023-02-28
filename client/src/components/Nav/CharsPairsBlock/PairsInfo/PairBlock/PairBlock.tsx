import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from './PairBlock.module.scss';
import { User } from '../../../../../models/User';
import { useAppSelector } from '../../../../../redux/store';
import { makeImageUrl } from '../../../../ui/helpers';

interface PairBlockProps {
  firstPair: User;
}

export const PairBlock: React.FC<PairBlockProps> = ({ firstPair }) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const imageUrl = makeImageUrl(firstPair._id, firstPair.pictures.avatar)

  return (
    <div className={styles.pairs}>
      <Link className={styles.link} to="/pairs">
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
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
