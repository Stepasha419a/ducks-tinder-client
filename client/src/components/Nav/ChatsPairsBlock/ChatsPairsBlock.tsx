import type { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import NavPair from './PairsInfo/NavPair';
import styles from './ChatsPairsBlock.module.scss';
import { OpenChatList } from '@features/chat';

interface ChatsPairsBlockProps {
  isPairsOpened: boolean;
  setIsPairsOpened: (value: boolean) => void;
}

const ChatsPairsBlock: FC<ChatsPairsBlockProps> = ({
  isPairsOpened,
  setIsPairsOpened,
}) => {
  const cnPairs = classNames(styles.title, isPairsOpened && styles.active);

  const cnMessages = classNames(styles.title, !isPairsOpened && styles.active);

  return (
    <>
      <div className={styles.titles}>
        <Link onClick={() => setIsPairsOpened(true)} className={cnPairs} to="/">
          Pairs
        </Link>
        <Link
          onClick={() => setIsPairsOpened(false)}
          className={cnMessages}
          to="/chat"
        >
          Messages
        </Link>
      </div>
      <div className={styles.content}>
        {isPairsOpened ? <NavPair /> : <OpenChatList />}
      </div>
    </>
  );
};

export default ChatsPairsBlock;
