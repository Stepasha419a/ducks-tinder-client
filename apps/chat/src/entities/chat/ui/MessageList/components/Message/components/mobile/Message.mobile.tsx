import { useRef, type FC, type PropsWithChildren } from 'react';
import classNames from 'classnames';

interface MessageProps {
  handleSelectMessage: () => void;
  isOwn: boolean;
}

export const MessageMobile: FC<PropsWithChildren<MessageProps>> = ({
  handleSelectMessage,
  isOwn,
  children,
}) => {
  const timerRef = useRef<null | NodeJS.Timeout>(null);

  const handleEventStart = () => {
    timerRef.current = setTimeout(() => {
      handleSelectMessage();
    }, 500);
  };

  const handleEventEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
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
