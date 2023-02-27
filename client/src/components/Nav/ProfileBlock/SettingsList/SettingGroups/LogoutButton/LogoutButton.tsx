import { logoutThunk } from '../../../../../../redux/auth/auth.thunks';
import { useAppDispatch } from '../../../../../../redux/store';
import styles from './LogoutButton.module.scss';

export const LoggoutButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.group}>
      <div className={styles.items}>
        <div
          onClick={() => dispatch(logoutThunk())}
          className={`${styles.item} ${styles.button}`}
        >
          <div className={styles.descr}>
            <div className={`${styles.title} ${styles.center}`}>
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
