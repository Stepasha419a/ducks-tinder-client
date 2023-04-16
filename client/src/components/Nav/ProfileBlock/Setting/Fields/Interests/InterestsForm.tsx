import type { ReactElement } from 'react';
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useAppDispatch } from '@hooks';
import { setIsUserInfoSetting } from '@entities/setting/model';
import { submitSettingsThunk } from '@entities/setting/model';
import { InterestsSettingPopup } from '@components';
import { useDefaultValues } from 'components/Nav/hooks';
import type { SettingFieldArrayValues } from 'components/Nav/interfaces';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './InterestsForm.module.scss';
import { ListItem } from '@shared/ui';

export const InterestsForm = (): ReactElement => {
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

  const toggleInterest = (item: string): void => {
    if (interests.includes(item)) {
      setInterests(interests.filter((interest: string) => interest !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const cancelHandler = (): void => {
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
                <ListItem
                  onClick={() => toggleInterest(item)}
                  key={item}
                  extraClassName={styles.item}
                  xmark
                >
                  {item}
                </ListItem>
              );
            })
          ) : (
            <ListItem extraClassName={styles.item}>
              You don't have interests
            </ListItem>
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
