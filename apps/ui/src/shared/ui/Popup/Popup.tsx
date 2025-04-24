import { type FC, type PropsWithChildren, useId } from 'react';
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
  const titleId = useId();
  const contentId = useId();
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const cn = classNames(styles.dialog, styles[size], extraClassName);

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
        <dialog
          aria-labelledby={titleId}
          aria-describedby={contentId}
          open={true}
          className={cn}
        >
          {title && (
            <h3 id={titleId} className={styles.title}>
              {title}
            </h3>
          )}
          <button
            aria-label="close dialog"
            onClick={closeHandler}
            className={styles.close}
          />
          <div className={styles.content} id={contentId}>
            {children}
          </div>
        </dialog>
        <button onClick={closeHandler} className={styles.closeArea}></button>
      </motion.div>
    </div>,
    portalElement!
  );
};
