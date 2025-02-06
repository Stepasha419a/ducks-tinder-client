import type { ShortUser } from '@ducks-tinder-client/common';
import type { FC } from 'react';
import { Preview } from '@entities/user';
import { PreviewContent } from './components';
import styles from './Pair.module.scss';

interface PairPropsInterface {
  user: ShortUser;
  setCurrentPair: () => void;
}

export const Pair: FC<PairPropsInterface> = ({ user, setCurrentPair }) => {
  if (!user.name) {
    return <div>loading...</div>;
  }

  return (
    <div onClick={setCurrentPair}>
      <Preview
        user={user}
        extraClassName={styles.pair}
        noSlider
        extraContent={
          <PreviewContent
            age={user.age}
            distance={user.distance}
            name={user.name}
          />
        }
      />
    </div>
  );
};
