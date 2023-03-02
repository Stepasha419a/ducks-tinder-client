import { Link } from 'react-router-dom';
import NavPair from './PairsInfo/NavPair';
import Chats from './Chats/Chats';
import styles from './ChatsPairsBlock.module.scss';
import { FC } from 'react';
import classNames from 'classnames';

interface ChatsPairsBlockProps {
  isPairsOpened: boolean;
  setIsPairsOpened: (value: boolean) => void;
}

const ChatsPairsBlock: FC<ChatsPairsBlockProps> = ({
  isPairsOpened,
  setIsPairsOpened,
}) => {
  const cnPairs = classNames(
    styles.title,
    isPairsOpened && styles.active
  );

  const cnMessages = classNames(
    styles.title,
    !isPairsOpened && styles.active
  );

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
        {isPairsOpened ? <NavPair /> : <Chats />}
      </div>
    </>
  );
};

export default ChatsPairsBlock;
