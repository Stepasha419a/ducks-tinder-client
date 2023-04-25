import type { FC } from 'react';
import { useState } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useController, useForm } from 'react-hook-form';
import { INITIAL_SORTS, INTERESTS_FOR_LOOP } from '@shared/constants';
import type { PairSorts } from '@shared/api/interfaces';
import { ListItem } from '@shared/ui';
import { PairsSettingsPopup } from './PairsSettingsPopup/PairsSettingsPopup';
import { InterestsSettingPopup } from '@entities/user/components';
import styles from './SortPairs.module.scss';

interface SortPairsProps {
  setSorts: (sorts: PairSorts) => void;
}

export const SortPairs: FC<SortPairsProps> = ({ setSorts }) => {
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);

  const { control, handleSubmit, reset } = useForm<PairSorts>({
    defaultValues: { ...INITIAL_SORTS },
  });

  const {
    field: { value: interests, onChange: setInterests },
  } = useController({
    name: 'interests',
    control,
  });

  const {
    field: { value: account, onChange: setAccount },
  } = useController({
    name: 'account',
    control,
  });

  const toggleInterest = (item: string): void => {
    if (interests.includes(item)) {
      setInterests(interests.filter((interest) => interest !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const toggleAccount = (item: string): void => {
    if (account.includes(item)) {
      setAccount(account.filter((setting) => setting !== item));
    } else {
      setAccount([...account, item]);
    }
  };

  const submitHandler = handleSubmit((data) => {
    setSorts(data);
    setIsSortPopupOpen(false);
  });

  const forcedToggleInterest = (item: string): void => {
    toggleInterest(item);
    submitHandler();
  };

  const forcedToggleAccount = (item: string): void => {
    toggleAccount(item);
    submitHandler();
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
          submitHandler={submitHandler}
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
