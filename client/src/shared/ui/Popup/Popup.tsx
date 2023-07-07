import type { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import styles from './Popup.module.scss';
import type { PopupProps } from './Popup.types';

const portalElement = document.getElementById('portal');

export const Popup: FC<PropsWithChildren<PopupProps>> = ({
  children,
  title,
  closeHandler,
  size = 'm',
  extraClassName,
}) => {
  const cn = classNames(styles.content, styles[size], extraClassName);

  return ReactDOM.createPortal(
    <div className={styles.popup}>
      <motion.div
        className={styles.body}
        transition={{ duration: 0.1 }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
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
