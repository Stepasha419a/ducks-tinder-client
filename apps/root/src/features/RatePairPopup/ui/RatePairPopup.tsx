import classNames from 'classnames';

import type { ShortUser } from '@ducks-tinder-client/common';
import {
  addModal,
  Button,
  Popup,
  Preview,
  useModalProps,
} from '@ducks-tinder-client/ui';

import { acceptPairThunk, refusePairThunk } from '@entities/user';

import * as styles from './RatePairPopup.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@shared/lib';

export interface RatePairPopupProps {
  currentPair: ShortUser;
}

export const RatePairPopup = () => {
  const { t } = useTranslation();

  const { props, resolveModal } =
    useModalProps<RatePairPopupProps>(RatePairPopup);
  const { currentPair } = props;

  const dispatch = useAppDispatch();

  const handleAccept = (): void => {
    dispatch(acceptPairThunk(currentPair.id));
    resolveModal(null);
  };

  const handleRefuse = (): void => {
    dispatch(refusePairThunk(currentPair.id));
    resolveModal(null);
  };

  return (
    <>
      <Popup closeHandler={() => resolveModal(null)} size="l">
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

addModal(RatePairPopup, 'RatePairPopup');
