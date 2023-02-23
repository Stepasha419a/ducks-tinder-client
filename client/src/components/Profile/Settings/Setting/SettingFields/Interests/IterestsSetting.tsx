import { useEffect, useState } from 'react';
import {
  setInnerObjectName,
  setIsUserInfoSetting,
} from '../../../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../../../redux/settings/settings.thunks';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import InterestsSettingPopup from '../../../../../Pairs/popups/Interests/InterestsSettings/InterestsSettingPopup';
import SettingWrapper from '../../SettingWrapper/SettingWrapper';
import styles from './IterestsSetting.module.scss';

interface InterestsSettingPropsInterface {
  cancelHandler: () => void;
}

const InterestsSetting: React.FC<InterestsSettingPropsInterface> = ({
  cancelHandler,
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [interests, setInterests] = useState(currentUser.interests as string[]);
  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormCloseable, setIsFormCloseable] = useState(true);
  const [inputValueError, setInputValueError] = useState('');

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

  const submitSettings = () => {
    dispatch(
      submitSettingsThunk({
        changedData: interests,
      })
    );
    dispatch(setIsUserInfoSetting(false));
    setInnerObjectName('');
  };

  return (
    <>
      <SettingWrapper
        formName={'Interests'}
        cancelHandler={cancelHandler}
        inputValueDirty={true}
        inputValueError={inputValueError}
        isFormCloseable={isFormCloseable}
        isFormValid={isFormValid}
        submitSettings={submitSettings}
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

export default InterestsSetting;
