import { logoutThunk } from '../../../../../redux/authReducer';
import { useAppDispatch } from '../../../../../redux/reduxStore';
import styles from './LogoutButton.module.scss';

const LoggoutButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.group}>
      <div className={styles.items}>
        <div
          onClick={() => dispatch(logoutThunk())}
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
