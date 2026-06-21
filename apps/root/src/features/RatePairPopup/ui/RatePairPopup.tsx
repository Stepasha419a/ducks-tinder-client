import type { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';

import type { ShortUser } from '@ducks-tinder-client/common';
import { Button, Popup, Preview } from '@ducks-tinder-client/ui';

import { acceptPairThunk, refusePairThunk } from '@entities/user';

import * as styles from './RatePairPopup.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@shared/lib';

interface RatePairPopupProps {
  currentPair: ShortUser;
  setCurrentPair: Dispatch<SetStateAction<ShortUser | null>>;
}

export const RatePairPopup: FC<RatePairPopupProps> = ({
  currentPair,
  setCurrentPair,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleAccept = (): void => {
    dispatch(acceptPairThunk(currentPair.id));
    setCurrentPair(null);
  };

  const handleRefuse = (): void => {
    dispatch(refusePairThunk(currentPair.id));
    setCurrentPair(null);
  };

  return (
    <>
      <Popup closeHandler={() => setCurrentPair(null)} size="l">
        <Preview user={currentPair} isFull extraClassName={styles.preview} />
        <div className={styles.btns}>
          <Button
            onClick={handleAccept}
            extraClassName={classNames(styles.btn, styles.border)}
          >
            {t('pairs.accept')}
          </Button>
          <Button onClick={handleRefuse} extraClassName={styles.btn}>
            {t('pairs.refuse')}
          </Button>
        </div>
      </Popup>
    </>
  );
};
