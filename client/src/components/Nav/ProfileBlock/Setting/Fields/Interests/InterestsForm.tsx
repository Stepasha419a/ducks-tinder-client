import { useState } from 'react';
import { FieldErrors, useFieldArray, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../../../hooks';
import { setIsUserInfoSetting } from '../../../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../../../redux/settings/settings.thunks';
import InterestsSettingPopup from '../../../../../Pairs/popups/Interests/InterestsSettings/InterestsSettingPopup';
import { useDefaultValues } from '../../../../hooks';
import {
  SettingChangedArrayData,
  SettingFieldArrayValues,
} from '../../../../interfaces';
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
  } = useForm<SettingFieldArrayValues>({
    defaultValues: { input: useDefaultValues() as SettingChangedArrayData },
    mode: 'onChange',
  });

  const { fields, remove, append } = useFieldArray({
    name: 'input',
    control,
    rules: {
      required: 'Form is required',
      minLength: { message: 'You must have at least 4 hobbies', value: 4 },
    },
  });

  const toggleSort = (itemName: string) => {
    const index = fields.findIndex((item) => item.name === itemName);
    if (~index) {
      remove(index);
    } else {
      append({ name: itemName });
    }
  };

  const cancelHandler = () => {
    dispatch(setIsUserInfoSetting(false));
  };

  const submitHandler = handleSubmit((data: SettingFieldArrayValues) => {
    const changedData = data.input.map((item) => item.name);
    dispatch(submitSettingsThunk({ changedData: changedData }));
  });

  const arrayErrors = errors.input || {};

  return (
    <>
      <SettingWrapper
        formName={'Interests'}
        errors={arrayErrors as FieldErrors<SettingFieldArrayValues>}
        isValid={isValid}
        cancelHandler={cancelHandler}
        submitHandler={submitHandler}
      >
        <div className={styles.title}>Your interests</div>
        <div className={styles.interests}>
          {fields.length ? (
            fields.map((item) => {
              return (
                <div
                  onClick={() => toggleSort(item.name)}
                  key={item.id}
                  className={styles.item}
                >
                  {item.name}
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
          pairInterests={fields}
          toggleInterest={toggleSort}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
    </>
  );
};
