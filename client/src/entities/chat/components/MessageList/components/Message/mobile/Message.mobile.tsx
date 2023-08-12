import type { FC, ReactNode } from 'react';
import styles from './Message.mobile.module.scss';

interface MessageProps {
  children: ReactNode;
  handleSelectMessage: () => void;
}

export const MessageMobile: FC<MessageProps> = ({
  children,
  handleSelectMessage,
}) => {
  let timer: null | NodeJS.Timeout = null;

  const handleEventStart = () => {
    timer = setTimeout(() => {
      handleSelectMessage();
    }, 500);
  };

  const handleEventEnd = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        onTouchStart={handleEventStart}
        onTouchEnd={handleEventEnd}
        onMouseDown={handleEventStart}
        onMouseUp={handleEventEnd}
      >
        <span className={styles.flex}>{children}</span>
      </div>
    </div>
  );
};
