import type { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import type { PopupProps } from './Popup.types';
import { mobileVariants, variants } from './Popup.variants';
import styles from './Popup.module.scss';

const portalElement = document.getElementById('portal');

export const Popup: FC<PropsWithChildren<PopupProps>> = ({
  children,
  title,
  closeHandler,
  size = 'm',
  extraClassName,
}) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const cn = classNames(styles.content, styles[size], extraClassName);

  const adaptiveVariants = isMobile ? mobileVariants : variants;
  const duration = isMobile ? 0.2 : 0.1;

  return createPortal(
    <div className={styles.popup}>
      <motion.div
        className={styles.body}
        variants={adaptiveVariants}
        initial={'initial'}
        animate={'animate'}
        exit={'initial'}
        transition={{ duration }}
        key="popup"
      >
        <div className={cn}>
          {title && <div className={styles.title}>{title}</div>}
          <div onClick={closeHandler} className={styles.close} />
          {children}
        </div>
        <div onClick={closeHandler} className={styles.closeArea}></div>
      </motion.div>
    </div>,
    portalElement!
  );
};
