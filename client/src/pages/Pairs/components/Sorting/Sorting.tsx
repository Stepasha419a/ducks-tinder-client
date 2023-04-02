import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { InterestsSettingPopup } from '../../../../components/popups';
import PairsSettingsPopup from '../../popups/PairsSettings/PairsSettingsPopup';
import styles from './Sorting.module.scss';
import {
  INITIAL_SORTS,
  INTERESTS_FOR_LOOP,
} from '../../../../shared/constants';
import { PairSorts } from '../../../../shared/api/interfaces';

interface SortingProps {
  setSorts: (sorts: PairSorts) => void;
}

export const Sorting: FC<SortingProps> = ({ setSorts }) => {
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

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((interest) => interest !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const toggleAccount = (item: string) => {
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

  const forcedToggleInterest = (item: string) => {
    toggleInterest(item);
    submitHandler();
  };

  const forcedToggleAccount = (item: string) => {
    toggleAccount(item);
    submitHandler();
  };

  const cnPopupBtn = classNames(styles.sort, isSortPopupOpen && styles.active);
  const cnInterestsBtn = classNames(
    styles.sort,
    account.includes('have interests') && styles.active
  );

  return (
    <>
      <div className={styles.sorting}>
        <div onClick={() => setIsSortPopupOpen(true)} className={cnPopupBtn}>
          <FontAwesomeIcon className={styles.icon} icon={faSliders} />
        </div>
        {INTERESTS_FOR_LOOP.map((item) => {
          const cnItem = classNames(
            styles.sort,
            interests.includes(item) && styles.active
          );
          return (
            <div
              onClick={() => forcedToggleInterest(item)}
              key={item}
              className={cnItem}
            >
              {item}
            </div>
          );
        })}
        <div
          onClick={() => forcedToggleAccount('have interests')}
          className={cnInterestsBtn}
        >
          have interests
        </div>
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
