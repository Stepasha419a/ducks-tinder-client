import { useAppDispatch, useAppSelector } from '@ducks-tinder-client/common';

import {
  dislikeUserThunk,
  likeUserThunk,
  returnUserThunk,
} from '@entities/user';
import type { Dispatch, SetStateAction } from 'react';
import { TinderAnimations } from '../constants';

export function useRateButtons(
  setAnimation: Dispatch<SetStateAction<TinderAnimations>>,
  handleSubmitAction: () => void
) {
  const dispatch = useAppDispatch();

  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);

  function startCenter() {
    handleSubmitAction();
    setTimeout(() => {
      setAnimation(TinderAnimations.Center);
    }, 400);
  }

  function handleReturn() {
    if (isReturnUser) {
      dispatch(returnUserThunk());
    }
  }

  function handleLike() {
    setAnimation(TinderAnimations.Like);
    startCenter();
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
  }

  function handleDislike() {
    setAnimation(TinderAnimations.Dislike);
    startCenter();
    setTimeout(() => {
      dispatch(dislikeUserThunk());
    }, 300);
  }

  function handleSuperLike() {
    setAnimation(TinderAnimations.SuperLike);
    startCenter();
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
  }

  return { handleReturn, handleDislike, handleSuperLike, handleLike };
}
