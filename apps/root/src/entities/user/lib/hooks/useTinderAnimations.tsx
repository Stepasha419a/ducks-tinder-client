import { useAppDispatch } from '@ducks-tinder-client/common';

import {
  dislikeUserThunk,
  likeUserThunk,
  TinderActions,
  TinderAnimations,
} from '@entities/user';
import { useCallback } from 'react';

export function useTinderAnimations(
  setAnimation: (animation: TinderAnimations) => void,
  onSubmit: () => void,
  onBeforeAction: (action: TinderActions) => void
) {
  const dispatch = useAppDispatch();

  const handleLike = useCallback(() => {
    onBeforeAction(TinderActions.Like);

    setAnimation(TinderAnimations.Like);
    setTimeout(() => {
      dispatch(likeUserThunk()).then(onSubmit);
    }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, onSubmit]);

  const handleSuperLike = useCallback(() => {
    onBeforeAction(TinderActions.SuperLike);

    setAnimation(TinderAnimations.SuperLike);
    setTimeout(() => {
      dispatch(likeUserThunk()).then(onSubmit);
    }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, onSubmit]);

  function handleDislike() {
    onBeforeAction(TinderActions.Dislike);

    setAnimation(TinderAnimations.Dislike);
    setTimeout(() => {
      dispatch(dislikeUserThunk()).then(onSubmit);
    }, 400);
  }

  return { handleLike, handleSuperLike, handleDislike };
}
