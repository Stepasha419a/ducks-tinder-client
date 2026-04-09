import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  faArrowTurnDown,
  faDownLong,
  faLeftLong,
  faRightLong,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { motion } from 'motion/react';

import { Button } from '@ducks-tinder-client/ui';

import * as styles from './Instructions.module.scss';

interface InstructionsProps {
  explore?: boolean;
}

export const Instructions: FC<InstructionsProps> = ({ explore }) => {
  const { t } = useTranslation();
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);

  const toggleInstructions = () => {
    setIsInstructionsOpen((prev) => !prev);
  };

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
      <Button onClick={toggleInstructions} extraClassName={styles.toggle}>
        {isInstructionsOpen ? t('instructions.hide') : t('instructions.show')}
      </Button>
      <motion.div
        transition={{ duration: 0.15 }}
        animate={{ width: isInstructionsOpen ? '800px' : '0' }}
        className={styles.items}
      >
        <div className={styles.instruction}>
          <FontAwesomeIcon icon={faLeftLong} className={styles.icon} />
          <div className={styles.text}>{t('instructions.no')}</div>
        </div>

        <div className={styles.instruction}>
          <FontAwesomeIcon icon={faRightLong} className={styles.icon} />
          <div className={styles.text}>{t('instructions.like')}</div>
        </div>

        <div className={styles.instruction}>
          <FontAwesomeIcon icon={faUpLong} className={styles.icon} />
          <div className={styles.text}>{t('instructions.openProfile')}</div>
        </div>

        <div className={styles.instruction}>
          <FontAwesomeIcon icon={faDownLong} className={styles.icon} />
          <div className={styles.text}>{t('instructions.closeProfile')}</div>
        </div>

        <div className={styles.instruction}>
          <FontAwesomeIcon
            icon={faArrowTurnDown}
            className={classNames(styles.icon, styles.icon_rotate)}
          />
          <div className={styles.text}>{t('instructions.superlike')}</div>
        </div>

        <div className={styles.instruction}>
          <div className={classNames(styles.icon, styles.icon_space)}></div>
          <div className={styles.text}>{t('instructions.next')}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};
