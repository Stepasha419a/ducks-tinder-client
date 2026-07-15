import type { Control } from 'react-hook-form';

import { addModal, Popup, useModalProps } from '@ducks-tinder-client/ui';

import type { PairFilterForm } from '@entities/user';

import { usePairFilterForm } from './lib';
import {
  AgeSetting,
  Buttons,
  Checkboxes,
  DistanceSetting,
  InterestsSetting,
  PicturesSetting,
} from './ui';
import * as styles from './PairsFilterPopup.module.scss';
import { useTranslation } from 'react-i18next';

export interface PairsFilterPopupProps {
  control: Control<PairFilterForm>;
}

export interface PairsFilterPopupReturn {
  isSubmit?: boolean;
  isReset?: boolean;
}

export const PairsFilterPopup = () => {
  const { t } = useTranslation();

  const { props, resolveModal } =
    useModalProps<PairsFilterPopupProps>(PairsFilterPopup);
  const { control } = props;

  const {
    interests,
    toggleInterest,
    toggleHasInterests,
    toggleIdentifyConfirmed,
    hasInterests,
    identifyConfirmed,
  } = usePairFilterForm(control);

  const submitHandler = () => {
    resolveModal<PairsFilterPopupReturn>({ isSubmit: true });
  };

  const handleReset = () => {
    resolveModal<PairsFilterPopupReturn>({ isReset: true });
  };

  return (
    <>
      <Popup
        title={t('pairs.filter.title')}
        size="l"
        closeHandler={submitHandler}
        extraClassName={styles.popup}
      >
        <form className={styles.form} onSubmit={submitHandler}>
          <DistanceSetting control={control} />
          <AgeSetting control={control} />
          <PicturesSetting control={control} />
          <InterestsSetting
            interests={interests}
            toggleInterest={toggleInterest}
          />
          <Checkboxes
            hasInterests={hasInterests}
            identifyConfirmed={identifyConfirmed}
            toggleHasInterests={toggleHasInterests}
            toggleIdentifyConfirmed={toggleIdentifyConfirmed}
          />
          <Buttons handleReset={handleReset} />
        </form>
      </Popup>
    </>
  );
};

addModal(PairsFilterPopup, 'PairsFilterPopup');
