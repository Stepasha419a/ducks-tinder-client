import type { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Body.module.scss';

interface MessageBodyProps {
  isOwn: boolean;
  isEdited: boolean;
  isSelectOpen: boolean;
}

export const Body: FC<PropsWithChildren<MessageBodyProps>> = ({
  isEdited,
  isOwn,
  isSelectOpen,
  children,
}) => {
  const cn = classNames(
    styles.message,
    isOwn && styles.own,
    isSelectOpen && styles.selected,
    isEdited && styles.edited
  );

  return <div className={cn}>{children}</div>;
};
