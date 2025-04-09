import type { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Body.module.scss';

interface MessageBodyProps {
  isOwn: boolean;
  isEdited: boolean;
  isSelectOpen: boolean;
  isReplied: boolean;
}

export const Body: FC<PropsWithChildren<MessageBodyProps>> = ({
  isEdited,
  isOwn,
  isSelectOpen,
  isReplied,
  children,
}) => {
  const cn = classNames(
    styles.message,
    isOwn && styles.own,
    isSelectOpen && styles.selected,
    isEdited && styles.edited,
    isReplied && styles.replied
  );

  return <div className={cn}>{children}</div>;
};
