import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { User, PreferAge } from '../../models/User';
import Pair from './Pair/Pair';
import PairPopup from './popups/Pair/PairPopup';
import PairsSettingsPopup from './popups/PairsSettings/PairsSettingsPopup';
import InterestsSettingPopup from './popups/Interests/InterestsSettings/InterestsSettingPopup';
import { Sorts, sortItemBySettings } from './utils/PairsUtils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import styles from './Pairs.module.scss';
import { getUserPairsThunk } from '../../redux/users/users.thunks';
import Sorting from './Sorting/Sorting';
import { initialSorts } from './Pairs.constants';

export const Pairs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const pairsState = useAppSelector((state) => state.usersPage.pairs);

  const [currentPair, setCurrentPair] = useState<User>({} as User);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);
  const [pairSorts, setPairSorts] = useState<Sorts>(initialSorts);

  useEffect(() => {
    if (!currentUser.pairs.length) {
      navigate('/');
    }
  }, [currentUser.pairs.length, navigate]);

  useEffect(() => {
    dispatch(getUserPairsThunk(currentUser.pairs.slice(1)));
  }, [dispatch, currentUser.pairs]);

  const addSort = (sortSetting: string | number | PreferAge, field: string) => {
    if (field === 'interests' || field === 'account') {
      const newValue = { [field]: [...pairSorts[field], sortSetting] };
      setPairSorts({ ...pairSorts, ...newValue });
    } else {
      const newValue = { [field]: sortSetting };
      setPairSorts({ ...pairSorts, ...newValue });
    }
  };

  const toggleSort = (sortSetting: string, field: 'account' | 'interests') => {
    if (pairSorts[field].includes(sortSetting)) {
      setPairSorts({
        ...pairSorts,
        [field]: pairSorts[field].filter((item) => item !== sortSetting),
      });
    } else {
      addSort(sortSetting, field);
    }
  };
  const clearSorts = () => {
    setPairSorts(initialSorts);
  };

  return (
    <>
      <div className={styles.likes}>
        <FontAwesomeIcon
          icon={faHeartCircleExclamation}
          className={styles.icon}
        />
        {currentUser.pairs.length} likes
      </div>
      <Sorting
        pairSorts={pairSorts}
        toggleSort={toggleSort}
        isSortPopupOpen={isSortPopupOpen}
        setIsSortPopupOpen={setIsSortPopupOpen}
      />
      <div className={styles.users}>
        {pairsState.length &&
          pairsState
            .filter((user: User) => sortItemBySettings(user, pairSorts))
            .map((user: User) => {
              return (
                <Pair
                  key={user._id}
                  user={user}
                  setCurrentPair={setCurrentPair}
                />
              );
            })}
      </div>
      {isSortPopupOpen && (
        <PairsSettingsPopup
          pairSorts={pairSorts}
          clearSorts={clearSorts}
          addSort={addSort}
          toggleSort={toggleSort}
          setIsSortPopupOpen={setIsSortPopupOpen}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
      {isInterestsSettingPopupOpen && (
        <InterestsSettingPopup
          pairInterests={pairSorts.interests}
          toggleInterest={(item) => toggleSort(item, 'interests')}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
      {currentPair.name && (
        <PairPopup currentPair={currentPair} setCurrentPair={setCurrentPair} />
      )}
    </>
  );
};
