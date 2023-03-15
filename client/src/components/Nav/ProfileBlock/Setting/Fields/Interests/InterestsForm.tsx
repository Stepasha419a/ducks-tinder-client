import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../../../hooks';
import { setIsUserInfoSetting } from '../../../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../../../redux/settings/settings.thunks';
import { InterestsSettingPopup } from '../../../../../popups';
import { useDefaultValues } from '../../../../hooks';
import { SettingFieldArrayValues } from '../../../../interfaces';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './InterestsForm.module.scss';

export const InterestsForm = () => {
  const dispatch = useAppDispatch();
  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    reset,
  } = useForm<SettingFieldArrayValues>({
    defaultValues: { input: useDefaultValues() as string[] },
    mode: 'onChange',
  });

  const {
    field: { value: interests, onChange: setInterests },
  } = useController({
    name: 'input',
    control,
    rules: {
      required: 'Form is required',
    },
  });

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((interest: string) => interest !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const cancelHandler = () => {
    reset();
    dispatch(setIsUserInfoSetting(false));
  };

  const submitHandler = handleSubmit((data) => {
    dispatch(submitSettingsThunk({ changedData: data.input }));
  });

  return (
    <>
      <SettingWrapper
        formName={'Interests'}
        errors={errors}
        isValid={isValid}
        cancelHandler={cancelHandler}
        submitHandler={submitHandler}
      >
        <div className={styles.title}>Your interests</div>
        <div className={styles.interests}>
          {interests.length ? (
            interests.map((item) => {
              return (
                <div
                  onClick={() => toggleInterest(item)}
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
          toggleInterest={toggleInterest}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
    </>
  );
};
