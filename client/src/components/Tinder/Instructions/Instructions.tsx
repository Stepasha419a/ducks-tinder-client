import {
  faArrowTurnDown,
  faDownLong,
  faLeftLong,
  faRightLong,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from './Instructions.module.scss';

const Instructions = () => {
  const [isInstructionsOpen, setisInstructionsOpen] = useState(true);

  if (!isInstructionsOpen) {
    return (
      <div className={styles.instructions}>
        <button
          onClick={() => setisInstructionsOpen(true)}
          className={styles.toggle}
        >
          show
        </button>
      </div>
    );
  }

  return (
    <div className={styles.instructions}>
      <button
        onClick={() => setisInstructionsOpen(false)}
        className={styles.toggle}
      >
        hide
      </button>
      <div className={styles.instruction}>
        <FontAwesomeIcon icon={faLeftLong} className={styles.icon} />
        <div className={styles.text}>no</div>
      </div>
      <div className={styles.instruction}>
        <FontAwesomeIcon icon={faRightLong} className={styles.icon} />
        <div className={styles.text}>like</div>
      </div>
      <div className={styles.instruction}>
        <FontAwesomeIcon icon={faUpLong} className={styles.icon} />
        <div className={styles.text}>open profile</div>
      </div>
      <div className={styles.instruction}>
        <FontAwesomeIcon icon={faDownLong} className={styles.icon} />
        <div className={styles.text}>close profile</div>
      </div>
      <div className={styles.instruction}>
        <FontAwesomeIcon
          icon={faArrowTurnDown}
          className={`${styles.icon} ${styles.icon_rotate}`}
        />
        <div className={styles.text}>superlike</div>
      </div>
      <div className={styles.instruction}>
        <div className={`${styles.icon} ${styles.icon_space}`}></div>
        <div className={styles.text}>next</div>
      </div>
    </div>
  );
};

export default Instructions;