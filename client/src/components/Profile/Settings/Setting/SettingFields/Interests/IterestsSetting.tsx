import { useEffect, useState } from 'react';
import { IUser, PartnerSettings } from '../../../../../../models/IUser';
import { IUserInnerKey } from '../../../../../../redux/settings/settings.slice';
import InterestsSettingPopup from '../../../../../Pairs/popups/Interests/InterestsSettings/InterestsSettingPopup';
import { Button, TextField } from '../../../../../ui';
import { interestsList } from './InterestsSetting.constant';
import styles from './IterestsSetting.module.scss';

interface InterestsSettingPropsInterface {
  currentUser: IUser;
  isFormValid: boolean;
  isFormCloseable: boolean;
  submitSettings: (
    inputName: keyof IUser | keyof PartnerSettings,
    changedData:
      | string
      | number
      | boolean
      | string[]
      | { from: number; to: number },
    innerObjectName?: IUserInnerKey
  ) => void;
  cancelHandler: () => void;
}

const InterestsSetting: React.FC<InterestsSettingPropsInterface> = ({
  currentUser,
  submitSettings,
  cancelHandler,
}) => {

  const [interests, setInterests] = useState(currentUser.interests as string[]);
  const [inputValue, setInputValue] = useState('');
  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormCloseable, setIsFormCloseable] = useState(true);
  const [inputValueError, setInputValueError] = useState('');
  let filteredResults = [] as string[];

  useEffect(() => {
    if (!interests.length) {
      setIsFormValid(false);
      setIsFormCloseable(false);
      setInputValueError("Form can't be empty");
    } else {
      setIsFormValid(true);
      setIsFormCloseable(true);
      setInputValueError('');
    }
  }, [interests.length]);

  if (inputValue.length > 1) {
    filteredResults = interestsList.filter((item) => {
      if (interests.includes(item)) return 0;

      if (
        item.slice(0, inputValue.length) ===
        inputValue.toLowerCase().slice(0, inputValue.length)
      ) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    filteredResults = [];
  }

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
      <div className={styles.setting}>
        <div className={`${styles.name} ${styles.name_error}`}>
          {inputValueError}
        </div>
        <div className={styles.name}>Interests</div>
        <div className={styles.content}>
          <div className={styles.search}>
            <TextField
              variant="low-rounded"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="type your interest's name here"
              type="text"
              extraClassName={styles.input}
            />
            <div className={styles.result}>
              {filteredResults.map((item) => {
                return (
                  <div
                    onClick={() => addInterest(item)}
                    key={item}
                    className={styles.item}
                  >
                    {item}
                    <div className={styles.plus}></div>
                  </div>
                );
              })}
            </div>
          </div>
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
        </div>
        <Button
          disabled={!isFormCloseable}
          onClick={() => cancelHandler()}
          variant="setting"
          extraClassName={styles.noBorder}
        >
          Cancel
        </Button>
        <Button
          disabled={!isFormValid}
          onClick={() => submitSettings('interests', interests)}
          variant="setting"
        >
          Update my interests
        </Button>
      </div>
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

export default InterestsSetting;
