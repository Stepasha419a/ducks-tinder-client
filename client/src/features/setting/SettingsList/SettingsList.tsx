import type { ReactElement } from 'react';
import { useAppDispatch } from '@hooks';
import type { Validation } from '@shared/interfaces';
import type {
  ChangedData,
  InnerObjectName,
  SettingInputName,
} from '@shared/api/interfaces';
import { logoutThunk } from '@entities/auth/model';
import { setInput, submitSettingsThunk } from '@entities/setting/model';
import {
  Account,
  Find,
  LinksSettingGroup,
  LogoutButton,
  Nickname,
} from '@entities/setting/components';
import styles from './SettingsList.module.scss';

// TODO: decompose it into nav's components
export const SettingsList = (): ReactElement => {
  const dispatch = useAppDispatch();

  const setInputHandler = (
    inputName: SettingInputName,
    validation: Validation | null = null,
    innerObjectName: InnerObjectName = null,
    formName = ''
  ): void => {
    dispatch(
      setInput({
        inputName,
        validation,
        innerObjectName,
        formName,
      })
    );
  };

  const updateInputHandler = (
    inputName: SettingInputName,
    changedData: ChangedData,
    innerObjectName?: InnerObjectName
  ): void => {
    dispatch(
      submitSettingsThunk({
        inputName,
        changedData,
        innerObjectName,
      })
    );
  };

  const logoutHandler = async () => dispatch(logoutThunk());

  return (
    <div className={styles.groups}>
      <Account
        setInputHandler={setInputHandler}
        updateInputHandler={updateInputHandler}
      />
      <Find
        setInputHandler={setInputHandler}
        updateInputHandler={updateInputHandler}
      />
      <Nickname setInputHandler={setInputHandler} />
      <LinksSettingGroup />
      <LogoutButton logout={logoutHandler} />
    </div>
  );
};
