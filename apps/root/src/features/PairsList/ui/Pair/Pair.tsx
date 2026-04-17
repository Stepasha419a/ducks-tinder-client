import type { FC } from 'react';

import type { ShortUser } from '@ducks-tinder-client/common';
import { Preview } from '@ducks-tinder-client/ui';

import { PreviewContent } from './components';
import * as styles from './Pair.module.scss';
import { useTranslation } from 'react-i18next';

interface PairPropsInterface {
  user: ShortUser;
  setCurrentPair: () => void;
}

export const Pair: FC<PairPropsInterface> = ({ user, setCurrentPair }) => {
  const { t } = useTranslation();

  if (!user.name) {
    return <div>{t('pairs.list.loading')}</div>;
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
