import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { Popup } from '@shared/ui';
import { usePairFilterForm } from '../lib';
import {
  AgeSetting,
  Buttons,
  Checkboxes,
  DistanceSetting,
  InterestsSetting,
  PicturesSetting,
  InterestSettingPopup,
} from './components';
import styles from './PairsFilterPopup.module.scss';
import type { PairFilterForm } from '@/entities/user/model/pair';
import type { Control, UseFormReset } from 'react-hook-form';

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
