import type { FC } from 'react';
import { Preview } from '@entities/user';
import type { ShortUser } from '@shared/api/interfaces';
import styles from './Pair.module.scss';
import { PreviewContent } from './ui';

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
