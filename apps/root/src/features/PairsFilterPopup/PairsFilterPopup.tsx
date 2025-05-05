import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import type { Control, UseFormReset } from 'react-hook-form';

import { Popup } from '@ducks-tinder-client/ui';

import type { PairFilterForm } from '@entities/user';

import { usePairFilterForm } from './lib';
import {
  AgeSetting,
  Buttons,
  Checkboxes,
  DistanceSetting,
  InterestSettingPopup,
  InterestsSetting,
  PicturesSetting,
} from './ui';
import styles from './PairsFilterPopup.module.scss';

interface PairsFilterPopupProps {
  setIsFilterPopupOpen: Dispatch<SetStateAction<boolean>>;
  control: Control<PairFilterForm>;
  handleSubmit: () => void;
  handleReset: UseFormReset<PairFilterForm>;
}

export const PairsFilterPopup: FC<PairsFilterPopupProps> = ({
  setIsFilterPopupOpen,
  control,
  handleReset,
  handleSubmit,
}) => {
  const {
    interests,
    toggleInterest,
    toggleHasInterests,
    toggleIdentifyConfirmed,
    hasInterests,
    identifyConfirmed,
  } = usePairFilterForm(control);

  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);

  const submitHandler = () => {
    handleSubmit();
    setIsFilterPopupOpen(false);
  };

  const handleCloseInterestSettingPopup = () => {
    setIsInterestsSettingPopupOpen(false);
  };

  return (
    <>
      <Popup
        title="Likes filter"
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
            setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
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
      {isInterestsSettingPopupOpen && (
        <InterestSettingPopup
          activeItems={interests}
          toggleItem={toggleInterest}
          handleClose={handleCloseInterestSettingPopup}
        />
      )}
    </>
  );
};
