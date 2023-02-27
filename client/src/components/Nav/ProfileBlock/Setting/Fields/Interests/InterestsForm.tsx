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

  const addInterest = (itemName: string) => {
    const newInterests = [...interests, itemName];
    setInterests(newInterests);
  };

  const deleteInterest = (itemName: string) => {
    const itemNameIndex = interests.findIndex((item) => item === itemName);
    const newInterests = [...interests];
    newInterests.splice(itemNameIndex, 1);
    setInterests(newInterests);
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
                  onClick={() => deleteInterest(item)}
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
          addSort={addInterest}
          deleteSort={deleteInterest}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
    </>
  );
};
