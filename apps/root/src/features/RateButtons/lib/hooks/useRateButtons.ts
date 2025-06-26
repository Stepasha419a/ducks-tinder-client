import { useAppDispatch, useAppSelector } from '@ducks-tinder-client/common';

import type { TinderAnimations } from '@entities/user';
import {
  returnUserThunk,
  TinderActions,
  useTinderAnimations,
} from '@entities/user';

export function useRateButtons(
  onAnimation: (animation: TinderAnimations) => void,
  onSubmit: () => void,
  onBeforeAction: (action: TinderActions) => void
) {
  const dispatch = useAppDispatch();

  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);

  const { handleDislike, handleLike, handleSuperLike } = useTinderAnimations(
    onAnimation,
    onSubmit,
    onBeforeAction
  );

  function handleReturn() {
    onBeforeAction(TinderActions.Return);

    if (isReturnUser) {
      dispatch(returnUserThunk()).then(onSubmit);
    }
  }

  return { handleReturn, handleDislike, handleSuperLike, handleLike };
}
