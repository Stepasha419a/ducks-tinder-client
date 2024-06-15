import {
  faArrowTurnDown,
  faDownLong,
  faLeftLong,
  faRightLong,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '@shared/ui';
import styles from './Instructions.module.scss';

interface InstructionsProps {
  explore?: boolean;
}

export const Instructions: FC<InstructionsProps> = ({ explore }) => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);

  return (
    <motion.div
      key="open-instructions"
      transition={{ duration: 0.15 }}
      initial={false}
      animate={{ width: isInstructionsOpen ? '100%' : '97px' }}
      className={classNames(
        styles.instructions,
        isInstructionsOpen && styles.open,
        explore && styles.explore
      )}
    >
      <Button
        onClick={() =>
          isInstructionsOpen
            ? setIsInstructionsOpen(false)
            : setIsInstructionsOpen(true)
        }
        extraClassName={styles.toggle}
      >
        {isInstructionsOpen ? 'hide' : 'show'}
      </Button>
      <motion.div
        transition={{ duration: 0.15 }}
        animate={{ width: isInstructionsOpen ? '800px' : '0' }}
        className={styles.items}
      >
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
      </motion.div>
    </motion.div>
  );
};
