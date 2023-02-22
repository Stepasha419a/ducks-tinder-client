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
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateUserThunk } from '../../redux/users/users.thunks';
import { IUser, PartnerSettings } from '../../models/IUser';
import { IUserInnerKey, setInnerObjectName } from '../../redux/settings/settings.slice';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const isUserInfoSetting = useAppSelector(
    (state) => state.settings.isUserInfoSetting
  );

  const [isImageSetting, setIsImageSetting] = useState(false);
  // name of the title in ProfileSetting
  const [formName, setFormName] = useState('');

  // objectName for inner object in user object if it is
  const submitSettings = (
    inputName: keyof IUser | keyof PartnerSettings,
    changedData:
      | string
      | number
      | boolean
      | string[]
      | { from: number; to: number },
    innerObjectName?: IUserInnerKey
  ) => {
    dispatch(
      updateUserThunk({
        currentUser,
        inputName,
        changedData,
        innerObjectName,
      })
    );
    dispatch(setInnerObjectName(null));
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
            formName={formName}
          />
        ) : (
          <SettingsList
            submitSettings={submitSettings}
            setFormName={setFormName}
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
