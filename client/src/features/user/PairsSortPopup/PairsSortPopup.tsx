import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { Popup } from '@shared/ui';
import { InterestsSettingPopup } from '@entities/user/components';
import { usePairSorts } from '../lib';
import {
  AgeSetting,
  Buttons,
  Checkboxes,
  DistanceSetting,
  InterestsSetting,
  PhotosSetting,
} from './components';
import styles from './PairsSortPopup.module.scss';

interface PairsSortPopupProps {
  setIsSortPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export const PairsSortPopup: FC<PairsSortPopupProps> = ({
  setIsSortPopupOpen,
}) => {
  const {
    control,
    submitHandler,
    account,
    toggleAccount,
    interests,
    toggleInterest,
    handleReset,
  } = usePairSorts();

  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);

  const handleSubmit = () => {
    submitHandler();
    setIsSortPopupOpen(false);
  };

  return (
    <>
      <Popup
        title="Likes filter"
        closeHandler={handleSubmit}
        extraClassName={styles.popup}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <DistanceSetting control={control} />
          <AgeSetting control={control} />
          <PhotosSetting control={control} />
          <InterestsSetting
            interests={interests}
            toggleInterest={toggleInterest}
            setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
          />
          <Checkboxes account={account} toggleAccount={toggleAccount} />
          <Buttons handleReset={handleReset} />
        </form>
      </Popup>
      {isInterestsSettingPopupOpen && (
        <InterestsSettingPopup
          pairInterests={interests}
          toggleInterest={toggleInterest}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
    </>
  );
};
