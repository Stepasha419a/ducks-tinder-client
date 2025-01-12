import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

interface MessageProps {
  handleSelectMessage: () => void;
  isOwn: boolean;
}

export const MessageMobile: FC<PropsWithChildren<MessageProps>> = ({
  handleSelectMessage,
  isOwn,
  children,
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

  const cn = classNames('wrapper', isOwn && 'own');

  return (
    <div className={cn}>
      <div
        className="container"
        onTouchStart={handleEventStart}
        onTouchEnd={handleEventEnd}
        onMouseDown={handleEventStart}
        onMouseUp={handleEventEnd}
      >
        <span className="flex">{children}</span>
      </div>
    </div>
  );
};
