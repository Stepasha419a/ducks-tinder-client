import type { FC, ReactElement } from 'react';
import { useState } from 'react';
import { ListItem } from '@shared/ui';
import SettingWrapper from '../Wrapper/SettingWrapper';
import { InterestsSettingPopup } from '@entities/user/components';
import styles from './InterestsForm.module.scss';
import { useSelectForm } from '../lib';

export const InterestsForm: FC = (): ReactElement => {
  const {
    formName,
    errors,
    isValid,
    items,
    toggleItem,
    cancelHandler,
    submitHandler,
  } = useSelectForm();

  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);

  return (
    <>
      <SettingWrapper
        formName={formName}
        errors={errors}
        isValid={isValid}
        cancelHandler={cancelHandler}
        submitHandler={submitHandler}
      >
        <div className={styles.title}>Your interests</div>
        <div className={styles.interests}>
          {items.length ? (
            items.map((item) => {
              return (
                <ListItem
                  onClick={() => toggleItem(item)}
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
          pairInterests={items}
          toggleInterest={toggleItem}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
    </>
  );
};
