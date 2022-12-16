import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../../../../redux/authReducer';
import styles from './LogoutButton.module.scss';

const LoggoutButton = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.group}>
      <div className={styles.items}>
        <div
          onClick={() => dispatch(logoutThunk() as any)}
          className={`${styles.item} ${styles.item_button}`}
        >
          <div className={styles.descr}>
            <div className={`${styles.title} ${styles.title_center}`}>
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggoutButton;
