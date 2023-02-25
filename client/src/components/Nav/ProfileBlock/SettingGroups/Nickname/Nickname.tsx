import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setInput } from '../../../../../redux/settings/settings.slice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import styles from './Nickname.module.scss';

const Nickname = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const SetEmailHandler = () => {
    dispatch(
      setInput({
        inputName: 'nickname',
        validation: { min: 6, max: 16 },
      })
    );
  };

  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>Internet account</div>
      <div className={styles.items}>
        <div
          onClick={SetEmailHandler}
          className={`${styles.item} ${styles.item_pointer}`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Nickname</div>
            <div className={styles.setting}>
              {currentUser.nickname || 'unknown'}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.groupDescr}>
        Create a username, share it and start searching for couples on Tinder
        around the world.
      </div>
    </div>
  );
};

export default Nickname;
