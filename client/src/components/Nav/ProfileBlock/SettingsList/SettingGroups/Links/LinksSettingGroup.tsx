import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from './LinksSettingGroup.module.scss';

export const LinksSettingGroup = () => {
  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>Safety Tips</div>
      <div className={styles.items}>
        <div className={`${styles.item} ${styles.link}`}>
          <Link to="/policy" className={styles.link} target="_blank">
            <div className={styles.descr}>
              <div className={styles.title}>
                Community Rules
              </div>
              <div className={styles.setting}>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className={styles.icon}
                />
              </div>
            </div>
          </Link>
        </div>
        <div className={`${styles.item} ${styles.link}`}>
          <Link to="/policy" className={styles.link} target="_blank">
            <div className={styles.descr}>
              <div className={styles.title}>
                Security and Policy Development Center
              </div>
              <div className={styles.setting}>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className={styles.icon}
                />
              </div>
            </div>
          </Link>
        </div>
        <div className={`${styles.item} ${styles.link}`}>
          <Link to="/policy" className={styles.link} target="_blank">
            <div className={styles.descr}>
              <div className={styles.title}>
                Safety Tips
              </div>
              <div className={styles.setting}>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className={styles.icon}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
