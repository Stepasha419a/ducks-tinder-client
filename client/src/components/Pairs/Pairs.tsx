import { faHeartCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { User } from '../../models/User';
import Pair from './Pair/Pair';
import PairPopup from './popups/Pair/PairPopup';
import PairsSettingsPopup from './popups/PairsSettings/PairsSettingsPopup';
import InterestsSettingPopup from './popups/Interests/InterestsSettings/InterestsSettingPopup';
import { Sorts, sortItemBySettings } from './utils/PairsUtils';
import { useNavigate } from 'react-router-dom';
import styles from './Pairs.module.scss';
import { getUserPairsThunk } from '../../redux/users/users.thunks';
import Sorting from './Sorting/Sorting';
import { initialSorts } from './Pairs.constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useController, useForm } from 'react-hook-form';

export const Pairs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const pairsState = useAppSelector((state) => state.usersPage.pairs);

  const { control, handleSubmit, getValues, reset } = useForm<Sorts>({
    defaultValues: { ...initialSorts },
  });

  const [currentPair, setCurrentPair] = useState<User>({} as User);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [isInterestsSettingPopupOpen, setIsInterestsSettingPopupOpen] =
    useState(false);

  useEffect(() => {
    if (!currentUser.pairs.length) {
      navigate('/');
    }
  }, [currentUser.pairs.length, navigate]);

  useEffect(() => {
    dispatch(getUserPairsThunk(currentUser.pairs.slice(1)));
  }, [dispatch, currentUser.pairs]);

  const {
    field: { value: interests, onChange: setInterests },
  } = useController({
    name: 'interests',
    control,
  });

  const {
    field: { value: account, onChange: setAccount },
  } = useController({
    name: 'account',
    control,
  });

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((interest) => interest !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const toggleAccount = (item: string) => {
    if (account.includes(item)) {
      setAccount(account.filter((setting) => setting !== item));
    } else {
      setAccount([...account, item]);
    }
  };

  const submitHandler = handleSubmit(() => setIsSortPopupOpen(false));

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
        interests={interests}
        toggleInterest={toggleInterest}
        account={account}
        toggleAccount={toggleAccount}
        isSortPopupOpen={isSortPopupOpen}
        setIsSortPopupOpen={setIsSortPopupOpen}
      />
      <div className={styles.users}>
        {pairsState.length &&
          pairsState
            .filter((user: User) => sortItemBySettings(user, getValues()))
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
          setIsSortPopupOpen={setIsSortPopupOpen}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
          interests={interests}
          toggleInterest={toggleInterest}
          account={account}
          toggleAccount={toggleAccount}
          control={control}
          submitHandler={submitHandler}
          reset={reset}
        />
      )}
      {isInterestsSettingPopupOpen && (
        <InterestsSettingPopup
          pairInterests={interests}
          toggleInterest={toggleInterest}
          setIsInterestsSettingPopupOpen={setIsInterestsSettingPopupOpen}
        />
      )}
      {currentPair.name && (
        <PairPopup currentPair={currentPair} setCurrentPair={setCurrentPair} />
      )}
    </>
  );
};
