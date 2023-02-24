import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { IUser, PartnerSettings } from '../../../../../models/IUser';
import {
  ChangedData,
  InnerObjectName,
  setInput,
} from '../../../../../redux/settings/settings.slice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import { RangeInput } from '../../../../ui';
import { RangeValue } from '../../../../ui/inputs/Range';
import styles from './Account.module.scss';

interface IAccount {
  errorFields: string[];
  submitSettings: (
    inputName: keyof IUser | keyof PartnerSettings,
    changedData: ChangedData,
    innerObjectName?: InnerObjectName
  ) => void;
}

const Account: React.FC<IAccount> = ({ submitSettings, errorFields }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [currentAgeSetting, setCurrentAgeSetting] = useState(
    currentUser.age ? currentUser.age : 18
  );

  const ageHandler = () => {
    submitSettings('age', currentAgeSetting);
  };

  const SetEmailHandler = () => {
    dispatch(
      setInput({
        inputName: 'email',
        validation: { max: 40, min: 0, email: true },
      })
    );
  };
  const SetNameHandler = () => {
    dispatch(
      setInput({
        inputName: 'name',
        validation: { min: 2, max: 14 },
      })
    );
  };
  const SetDescriptionHandler = () => {
    dispatch(
      setInput({
        inputName: 'description',
        validation: { min: 50, max: 400 },
      })
    );
  };
  const SetSexHandler = () => {
    dispatch(
      setInput({
        inputName: 'sex',
      })
    );
  };

  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>Account Settings</div>
      <div className={styles.items}>
        <div
          onClick={SetEmailHandler}
          className={`${styles.item} ${styles.item_pointer}`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Email</div>
            <div className={styles.setting}>
              {currentUser.email}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div
          onClick={SetNameHandler}
          className={`${styles.item} ${styles.item_pointer}`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Name</div>
            <div className={styles.setting}>
              {currentUser.name}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div
          onClick={SetDescriptionHandler}
          className={`${styles.item} ${styles.item_pointer} ${
            errorFields.includes('description') ? styles.item_error : ''
          }`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Description</div>
            <div className={`${styles.setting} ${styles.setting_textOverflow}`}>
              {currentUser.description || 'Empty description'}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div
          onClick={SetSexHandler}
          className={`${styles.item} ${styles.item_pointer} ${
            errorFields.includes('sex') ? styles.item_error : ''
          }`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Sex</div>
            <div className={styles.setting}>
              {currentUser.sex || 'Empty sex'}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.descr}>
            <div className={styles.title}>Age</div>
            <div className={styles.setting}>{currentAgeSetting} years old</div>
          </div>
          <div className={styles.setting}>
            <div className={styles.slider}>
              <RangeInput
                value={currentAgeSetting}
                setValue={(value: RangeValue) => {
                  setCurrentAgeSetting(+value);
                }}
                completeValue={() => ageHandler()}
                min={18}
                max={100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.groupDescr}>
        Verified email adress helps to protect your account
      </div>
    </div>
  );
};

export default Account;
