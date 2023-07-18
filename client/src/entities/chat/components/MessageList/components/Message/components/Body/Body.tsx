import type { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Body.module.scss';

interface MessageBodyProps {
  isOwn: boolean;
  isEdited: boolean;
  isSelectOpen: boolean;
  isMessageEditing: boolean;
}

export const Body: FC<PropsWithChildren<MessageBodyProps>> = ({
  isEdited,
  isMessageEditing,
  isOwn,
  isSelectOpen,
  children,
}) => {
  const cn = classNames(
    styles.message,
    isOwn && styles.own,
    isSelectOpen && styles.selected,
    isMessageEditing && styles.editing,
    isEdited && styles.edited
  );

  return <div className={cn}>{children}</div>;
};
