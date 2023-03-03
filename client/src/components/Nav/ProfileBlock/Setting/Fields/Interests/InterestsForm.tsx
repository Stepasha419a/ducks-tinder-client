import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../redux/store';
import InterestsSettingPopup from '../../../../../Pairs/popups/Interests/InterestsSettings/InterestsSettingPopup';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './InterestsForm.module.scss';

export const InterestsForm = () => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [interests, setInterests] = useState<string[]>(currentUser.interests);
  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);
  const [isFormCloseable, setIsFormCloseable] = useState(true);
  const [inputValueError, setInputValueError] = useState('');

  useEffect(() => {
    if (!interests.length) {
      setIsFormCloseable(false);
      setInputValueError("Form can't be empty");
    } else {
      setIsFormCloseable(true);
      setInputValueError('');
    }
  }, [interests.length]);

  const toggleSort = (itemName: string) => {
    if (interests.includes(itemName)) {
      setInterests(interests.filter((item) => item !== itemName));
    } else {
      setInterests([...interests, itemName]);
    }
  };

  return (
    <>
      <SettingWrapper
        formName={'Interests'}
        inputValueDirty={true}
        inputValueError={inputValueError}
        isFormCloseable={isFormCloseable}
        inputValue={interests}
        setInputValue={
          setInterests as Dispatch<SetStateAction<string | string[]>>
        }
      >
        <div className={styles.title}>Your interests</div>
        <div className={styles.interests}>
          {interests.length ? (
            interests.map((item) => {
              return (
                <div
                  onClick={() => toggleSort(item)}
                  key={item}
                  className={styles.item}
                >
                  {item}
                  <div className={styles.xmark}></div>
                </div>
              );
            })
          ) : (
            <div className={styles.item}>You don't have interests</div>
          )}
        </div>
        <div
          onClick={() => setIsInterestsSettingPopupOpen(true)}
          className={styles.showAll}
        >
          Show all
        </div>
      </SettingWrapper>
      {isInterestsSettingPopupOpen && (
        <InterestsSettingPopup
          pairInterests={interests}
          toggleInterest={toggleSort}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
    </>
  );
};
