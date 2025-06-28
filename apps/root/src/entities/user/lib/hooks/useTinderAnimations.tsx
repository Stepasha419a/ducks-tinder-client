import { useAppDispatch } from '@ducks-tinder-client/common';

import {
  dislikeUserThunk,
  likeUserThunk,
  TinderActions,
  TinderAnimations,
} from '@entities/user';
import { useCallback } from 'react';

export function useTinderAnimations({
  setAnimation,
  onSubmit,
  onBeforeAction,
  disabled,
}: {
  setAnimation: (animation: TinderAnimations) => void;
  onSubmit: () => void;
  onBeforeAction: (action: TinderActions) => void;
  disabled?: boolean;
}) {
  const dispatch = useAppDispatch();

  const handleLike = useCallback(() => {
    if (disabled) {
      return;
    }

    onBeforeAction(TinderActions.Like);

    setAnimation(TinderAnimations.Like);
    setTimeout(() => {
      dispatch(likeUserThunk()).then(onSubmit);
    }, 400);
  }, [disabled, onBeforeAction, setAnimation, dispatch, onSubmit]);

  const handleSuperLike = useCallback(() => {
    if (disabled) {
      return;
    }

    onBeforeAction(TinderActions.SuperLike);

    setAnimation(TinderAnimations.SuperLike);
    setTimeout(() => {
      dispatch(likeUserThunk()).then(onSubmit);
    }, 400);
  }, [disabled, onBeforeAction, setAnimation, dispatch, onSubmit]);

  const handleDislike = useCallback(() => {
    if (disabled) {
      return;
    }

    onBeforeAction(TinderActions.Dislike);

    setAnimation(TinderAnimations.Dislike);
    setTimeout(() => {
      dispatch(dislikeUserThunk()).then(onSubmit);
    }, 400);
  }, [disabled, dispatch, onBeforeAction, onSubmit, setAnimation]);

  return { handleLike, handleSuperLike, handleDislike };
}
