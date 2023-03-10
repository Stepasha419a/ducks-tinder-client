import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { createNotification } from '../../../../redux/notifications/notifications.slice';
import {
  ChangedData,
  InnerObjectName,
  SettingInputName,
  Validation,
} from '../../../../redux/settings/settings.interfaces';
import { setInput } from '../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../redux/settings/settings.thunks';
import {
  Account,
  Find,
  LinksSettingGroup,
  LoggoutButton,
  Nickname,
} from './settingGroups';
import styles from './SettingsList.module.scss';

const SettingsList = () => {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );
  const errorFields = useAppSelector((state) => state.settings.errorFields);

  useEffect(() => {
    const errorText =
      'You have some empty fields, they are selected with red color';
    const result = notifications.find((item) => item.text === errorText);
    if (!result && errorFields.length) {
      dispatch(createNotification({ type: 'error', text: errorText }));
    } // eslint-disable-next-line
  }, [errorFields.length, dispatch]);

  const setInputHandler = (
    inputName: SettingInputName,
    validation?: Validation | null,
    innerObjectName?: InnerObjectName,
    formName?: string
  ) => {
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
  ) => {
    dispatch(
      submitSettingsThunk({
        inputName,
        changedData,
        innerObjectName,
      })
    );
  };

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
      <LoggoutButton />
    </div>
  );
};

export default SettingsList;
