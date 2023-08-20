import type { FC, ReactElement } from 'react';
import { useState } from 'react';
import { ListItem } from '@shared/ui';
import { SettingWrapper } from '../Wrapper/SettingWrapper';
import { ItemsSettingPopup } from '@entities/setting/components';
import { useProfileSelectForm } from '@features/setting/lib';
import styles from './SelectForm.module.scss';
import { INTERESTS_LIST } from '@/entities/user/model';

export const SelectForm: FC = (): ReactElement => {
  const {
    formName,
    errors,
    isValid,
    items,
    toggleItem,
    cancelHandler,
    submitHandler,
  } = useProfileSelectForm();

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
                  pointer
                  key={item.name}
                  extraClassName={styles.item}
                  xmark
                >
                  {item.name}
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
        <ItemsSettingPopup
          list={INTERESTS_LIST}
          activeItems={items}
          toggleItem={toggleItem}
          setIsItemsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
    </>
  );
};
