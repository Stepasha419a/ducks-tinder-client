import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../../../redux/reduxStore';
import styles from './Nickname.module.scss';

interface INickname {
  setSettingInput: (formName: string, inputName: string, innerObjectName?: string) => void;
}

const Nickname: React.FC<INickname> = ({setSettingInput}) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser)

  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>Internet account</div>
      <div className={styles.items}>
        <div
          onClick={() => setSettingInput('Nickname', 'nickname')}
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
