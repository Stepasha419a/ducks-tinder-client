import {
  faHeartCircleExclamation,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { User, PreferAge } from '../../models/User';
import Pair from './Pair/Pair';
import PairPopup from './popups/Pair/PairPopup';
import PairsSettingsPopup from './popups/PairsSettings/PairsSettingsPopup';
import InterestsSettingPopup from './popups/Interests/InterestsSettings/InterestsSettingPopup';
import { ISorts, sortItemBySettings } from './utils/PairsUtils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './Pairs.module.scss';
import { getUserPairsThunk } from '../../redux/users/users.thunks';

export const Pairs: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const pairsState = useAppSelector((state) => state.usersPage.pairs);

  const [pairsPaddingWidth, setPairsPaddingWidth] = useState(0);
  const [currentPair, setCurrentPair] = useState<User>({} as User);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);
  const [pairSorts, setPairSorts] = useState<ISorts>({
    distance: 100,
    age: { min: 18, max: 100 },
    photos: 1,
    interests: [],
    account: [],
  });

  useEffect(() => {
    if (!currentUser.pairs.length) {
      navigate('/');
    }
  }, [currentUser.pairs.length, navigate]);

  const interestsForLoop = ['music', 'travelling', 'movies', 'sport'];

  const userPairsRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    dispatch(getUserPairsThunk(currentUser.pairs.slice(1)));
  }, [dispatch, currentUser.pairs]);

  useEffect(() => {
    if (userPairsRef.current) {
      const { width } = userPairsRef.current.getBoundingClientRect();
      setPairsPaddingWidth((width % 254) / 2);
    }
  }, [userPairsRef.current?.clientWidth]);

  const addSort = (sortSetting: string | number | PreferAge, field: string) => {
    if (field === 'interests' || field === 'account') {
      const newValue = { [field]: [...pairSorts[field], sortSetting] };
      setPairSorts({ ...pairSorts, ...newValue });
    } else {
      const newValue = { [field]: sortSetting };
      setPairSorts({ ...pairSorts, ...newValue });
    }
  };

  const deleteSort = (
    sortSetting: string | number | PreferAge,
    field: string
  ) => {
    if (field === 'interests' || field === 'account') {
      const sortIndex = pairSorts[field].findIndex(
        (item: string) => item === sortSetting
      );
      const newArr = [...pairSorts[field]];
      newArr.splice(sortIndex, 1);
      setPairSorts({ ...pairSorts, [field]: newArr });
    } else {
      setPairSorts({ ...pairSorts, [field]: sortSetting });
    }
  };

  const clearSorts = () => {
    setPairSorts({
      distance: 100,
      age: { min: 18, max: 100 },
      photos: 1,
      interests: [],
      account: [],
    });
  };

  return (
    <>
      <div className={styles.likes}>
        <FontAwesomeIcon
          icon={faHeartCircleExclamation}
          className={styles.icon}
        />
        &nbsp;{currentUser.pairs.length} likes
      </div>
      <div className={styles.settings}>
        <div
          onClick={() => setIsSortPopupOpen(true)}
          className={styles.setting}
        >
          <FontAwesomeIcon icon={faSliders} />
        </div>
        {interestsForLoop.map((item) => {
          return (
            <div
              onClick={() => {
                pairSorts.interests.includes(item)
                  ? deleteSort(item, 'interests')
                  : addSort(item, 'interests');
              }}
              key={item}
              className={`${styles.setting} ${
                pairSorts.interests.includes(item) ? styles.sort : ''
              }`}
            >
              {item}
            </div>
          );
        })}
        <div
          onClick={() => {
            pairSorts.account.includes('have interests')
              ? deleteSort('have interests', 'account')
              : addSort('have interests', 'account');
          }}
          className={`${styles.setting} ${
            pairSorts.account.includes('have interests') ? styles.sort : ''
          }`}
        >
          have interests
        </div>
      </div>
      <div
        ref={userPairsRef}
        style={{
          paddingLeft: `${pairsPaddingWidth}px`,
          paddingRight: `${pairsPaddingWidth}px`,
        }}
        className={styles.users}
      >
        {pairsState.length &&
          pairsState.map((user: User) => {
            const isValid = sortItemBySettings(user, pairSorts);
            if (isValid) {
              return (
                <Pair
                  key={user._id}
                  user={user}
                  setCurrentPair={setCurrentPair}
                />
              );
            }
            return null;
          })}
      </div>
      {isSortPopupOpen && (
        <PairsSettingsPopup
          pairSorts={pairSorts}
          clearSorts={clearSorts}
          addSort={addSort}
          deleteSort={deleteSort}
          setIsSortPopupOpen={setIsSortPopupOpen}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
      {isInterestsSettingPopupOpen && (
        <InterestsSettingPopup
          pairInterests={pairSorts.interests}
          addSort={addSort}
          deleteSort={deleteSort}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
      {currentPair.name && (
        <PairPopup currentPair={currentPair} setCurrentPair={setCurrentPair} />
      )}
    </>
  );
};
