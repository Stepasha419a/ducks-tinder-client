import type { FC } from 'react';
import { useState } from 'react';
import { INTERESTS_FOR_LOOP } from '@entities/user/model';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem } from '@shared/ui';
import { InterestsSettingPopup } from '@entities/user/components';
import { usePairSorts } from './lib';
import { PairsSettingsPopup } from './PairsSettingsPopup/PairsSettingsPopup';
import styles from './SortPairs.module.scss';

export const SortPairs: FC = () => {
  const {
    control,
    submitHandler,
    account,
    toggleAccount,
    forcedToggleAccount,
    interests,
    toggleInterest,
    forcedToggleInterest,
    reset,
  } = usePairSorts();

  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);

  const handleSubmit = () => {
    submitHandler();
    setIsSortPopupOpen(false);
  };

  return (
    <>
      <div className={styles.sorting}>
        <ListItem
          onClick={() => setIsSortPopupOpen(true)}
          isActive={isSortPopupOpen}
          extraClassName={styles.item}
        >
          <FontAwesomeIcon className={styles.icon} icon={faSliders} />
        </ListItem>
        {INTERESTS_FOR_LOOP.map((item) => {
          return (
            <ListItem
              onClick={() => forcedToggleInterest(item)}
              isActive={interests.includes(item)}
              extraClassName={styles.item}
              key={item}
            >
              {item}
            </ListItem>
          );
        })}
        <ListItem
          onClick={() => forcedToggleAccount('have interests')}
          isActive={account.includes('have interests')}
          extraClassName={styles.item}
        >
          have interests
        </ListItem>
      </div>
      {isSortPopupOpen && (
        <PairsSettingsPopup
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
          interests={interests}
          toggleInterest={toggleInterest}
          account={account}
          toggleAccount={toggleAccount}
          control={control}
          submitHandler={handleSubmit}
          reset={reset}
        />
      )}
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
