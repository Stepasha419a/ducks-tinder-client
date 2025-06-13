import { useAppDispatch } from '@ducks-tinder-client/common';

import { dislikeUserThunk, likeUserThunk } from '@entities/user';
import type { Dispatch, SetStateAction } from 'react';
import { TinderAnimations } from '../constants';

export function useTinderAnimations(
  setAnimation: Dispatch<SetStateAction<TinderAnimations>>
) {
  const dispatch = useAppDispatch();

  function startCenter() {
    setTimeout(() => {
      setAnimation(TinderAnimations.Center);
    }, 400);
  }

  function handleLike() {
    setAnimation(TinderAnimations.Like);
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
    startCenter();
  }

  function handleSuperLike() {
    setAnimation(TinderAnimations.SuperLike);
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
    startCenter();
  }

  function handleDislike() {
    setAnimation(TinderAnimations.Dislike);
    setTimeout(() => {
      dispatch(dislikeUserThunk());
    }, 300);
    startCenter();
  }

  return { handleLike, handleSuperLike, handleDislike };
}
