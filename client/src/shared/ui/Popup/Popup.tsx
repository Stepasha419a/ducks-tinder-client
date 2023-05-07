import type { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
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
      <div className={styles.body}>
        <div className={cn}>
          {title && <div className={styles.title}>{title}</div>}
          <div onClick={closeHandler} className={styles.close} />
          {children}
        </div>
        <div onClick={closeHandler} className={styles.closeArea}></div>
      </div>
    </div>,
    portalElement!
  );
};
