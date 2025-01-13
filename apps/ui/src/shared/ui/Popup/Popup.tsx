import classNames from 'classnames';
import { motion } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { useAdaptiveMediaQuery } from '@shared/lib';
import styles from './Popup.module.scss';
import type { PopupProps } from './Popup.types';
import { mobileVariants, variants } from './Popup.variants';

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

  return ReactDOM.createPortal(
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
