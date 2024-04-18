import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { Popup } from '@shared/ui';
import { ItemsSettingPopup } from '@entities/user/components';
import { usePairSorts } from '../lib';
import {
  AgeSetting,
  Buttons,
  Checkboxes,
  DistanceSetting,
  InterestsSetting,
  PicturesSetting,
} from './components';
import styles from './PairsSortPopup.module.scss';
import { INTERESTS } from '@/shared/api/constant';

interface PairsSortPopupProps {
  setIsSortPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export const PairsSortPopup: FC<PairsSortPopupProps> = ({
  setIsSortPopupOpen,
}) => {
  const {
    control,
    submitHandler,
    interests,
    toggleInterest,
    handleReset,
    toggleHasInterests,
    toggleIdentifyConfirmed,
    hasInterests,
    identifyConfirmed,
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
        <ItemsSettingPopup
          list={INTERESTS}
          activeItems={interests}
          toggleItem={toggleInterest}
          setIsItemsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
    </>
  );
};
