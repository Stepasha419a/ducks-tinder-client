import styles from './Popup.module.scss';
import { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { PopupProps } from './Popup.types';

const portal = document.getElementById('portal');

export const Popup: FC<PropsWithChildren<PopupProps>> = ({
  children,
  title,
  closeHandler,
  extraClassName,
  size = 'm',
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
    portal!
  );
};
