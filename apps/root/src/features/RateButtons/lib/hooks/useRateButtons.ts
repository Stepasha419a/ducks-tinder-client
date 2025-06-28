import { useAppDispatch, useAppSelector } from '@ducks-tinder-client/common';

import type { TinderAnimations } from '@entities/user';
import {
  returnUserThunk,
  TinderActions,
  useTinderAnimations,
} from '@entities/user';
import { useCallback } from 'react';

export function useRateButtons({
  onAnimation,
  onSubmit,
  onBeforeAction,
  disabledActions,
}: {
  onAnimation: (animation: TinderAnimations) => void;
  onSubmit: () => void;
  onBeforeAction: (action: TinderActions) => void;
  disabledActions?: boolean;
}) {
  const dispatch = useAppDispatch();

  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);

  const { handleDislike, handleLike, handleSuperLike } = useTinderAnimations({
    setAnimation: onAnimation,
    onSubmit,
    onBeforeAction,
    disabled: disabledActions,
  });

  const handleReturn = useCallback(() => {
    if (disabledActions) {
      return;
    }

    onBeforeAction(TinderActions.Return);

    if (isReturnUser) {
      dispatch(returnUserThunk()).then(onSubmit);
    }
  }, [disabledActions, dispatch, isReturnUser, onBeforeAction, onSubmit]);

  return { handleReturn, handleDislike, handleSuperLike, handleLike };
}
