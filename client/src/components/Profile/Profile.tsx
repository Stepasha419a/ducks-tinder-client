import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faMagnifyingGlass,
  faFireFlameCurved,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UserImage from './UserImage/UserImage';
import SettingsList from './Settings/SettingsList';
import Setting from './Settings/Setting/Setting';
import ImageSetting from './ProfileImageChange/ImageSetting/ImageSetting';
import styles from './Profile.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/reduxStore';
import { updateUserThunk } from '../../redux/users/users.thunks';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [isUserInfoSetting, setIsUserInfoSetting] = useState(false);
  const [isImageSetting, setIsImageSetting] = useState(false);
  const [formName, setFormName] = useState(''); // name of the title in ProfileSetting
  const [settingInputName, setSettingInputName] = useState('');
  const [innerObjectName, setInnerObjectName] = useState('');

  // objectName for inner object in user object if it is
  const submitSettings = (
    inputName: string,
    changedData:
      | string
      | number
      | boolean
      | string[]
      | { from: number; to: number },
    innerObjectName?: string
  ) => {
    dispatch(
      updateUserThunk({
        currentUser,
        inputName,
        changedData,
        innerObjectName,
      })
    );
    setIsUserInfoSetting(false);
    setInnerObjectName('');
  };

  return (
    <div className={styles.profile}>
      <aside className={styles.info}>
        <div className={styles.links}>
          <Link className={styles.mainLink} to="/">
            <FontAwesomeIcon icon={faFireFlameCurved} />
          </Link>
          <div className={styles.review}>
            <Link className={styles.link} to="#">
              <FontAwesomeIcon icon={faBriefcase} />
            </Link>
          </div>
          <div className={styles.work}>
            <Link className={styles.link} to="#">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
          </div>
        </div>
        {isUserInfoSetting ? (
          <Setting
            currentUser={currentUser}
            setIsUserInfoSetting={setIsUserInfoSetting}
            submitSettings={submitSettings}
            formName={formName}
            settingInputName={settingInputName}
            innerObjectName={innerObjectName}
            setInnerObjectName={setInnerObjectName}
          />
        ) : (
          <SettingsList
            setIsUserInfoSetting={setIsUserInfoSetting}
            submitSettings={submitSettings}
            setFormName={setFormName}
            setSettingInputName={setSettingInputName}
            setInnerObjectName={setInnerObjectName}
          />
        )}
      </aside>
      <div className={styles.content}>
        <div className={styles.user}>
          {isImageSetting ? (
            <ImageSetting
              setIsImageSetting={setIsImageSetting}
              currentUser={currentUser}
            />
          ) : (
            <UserImage
              currentUser={currentUser}
              setIsImageSetting={setIsImageSetting}
            />
          )}
        </div>
      </div>
    </div>
  );
};
