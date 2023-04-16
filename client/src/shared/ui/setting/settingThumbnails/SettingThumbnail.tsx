import type { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './SettingThumbnail.module.scss';

interface SettingThumbnailProps {
  title?: string;
  value?: string;
  isPointer?: boolean;
  isError?: boolean;
  isOverflow?: boolean;
  isLogout?: boolean;
  extraClassName?: string;
  clickHandler?: () => void;
}

// TODO: use it into setting entity, create custom features for every setting field
export const SettingThumbnail: FC<PropsWithChildren<SettingThumbnailProps>> = ({
  clickHandler,
  children,
  title,
  value,
  isPointer,
  isError,
  isOverflow,
  isLogout,
  extraClassName,
}) => {
  const cn = classNames(
    styles.thumbnail,
    isPointer && styles.pointer,
    isError && styles.error,
    isOverflow && styles.overflow,
    isLogout && styles.logout,
    extraClassName
  );

  return (
    <div onClick={clickHandler} className={cn}>
      {(title || value) && (
        <div className={styles.descr}>
          <div className={styles.title}>{title}</div>
          <div className={styles.value}>
            {value}
            {isPointer && !isLogout && (
              <FontAwesomeIcon icon={faAngleRight} className={styles.icon} />
            )}
          </div>
        </div>
      )}
      {children && <div className={styles.setting}>{children}</div>}
    </div>
  );
};
