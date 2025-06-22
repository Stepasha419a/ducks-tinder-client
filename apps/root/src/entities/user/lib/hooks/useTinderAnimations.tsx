import { useAppDispatch } from '@ducks-tinder-client/common';

import {
  dislikeUserThunk,
  likeUserThunk,
  TinderAnimations,
} from '@entities/user';
import { useCallback } from 'react';

export function useTinderAnimations(
  setAnimation: (animation: TinderAnimations) => void,
  onSubmit?: () => void
) {
  const dispatch = useAppDispatch();

  const handleLike = useCallback(() => {
    setAnimation(TinderAnimations.Like);
    setTimeout(() => {
      dispatch(likeUserThunk()).then(onSubmit);
    }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, onSubmit]);

  const handleSuperLike = useCallback(() => {
    setAnimation(TinderAnimations.SuperLike);
    setTimeout(() => {
      dispatch(likeUserThunk()).then(onSubmit);
    }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, onSubmit]);

  function handleDislike() {
    setAnimation(TinderAnimations.Dislike);
    setTimeout(() => {
      dispatch(dislikeUserThunk()).then(onSubmit);
    }, 400);
  }

  return { handleLike, handleSuperLike, handleDislike };
}
