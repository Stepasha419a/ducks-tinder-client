import { useAppDispatch, useAppSelector } from '@ducks-tinder-client/common';

import type { TinderAnimations } from '@entities/user';
import { returnUserThunk, useTinderAnimations } from '@entities/user';

export function useRateButtons(
  onAnimation: (animation: TinderAnimations) => void,
  onSubmit: () => void
) {
  const dispatch = useAppDispatch();

  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);

  const { handleDislike, handleLike, handleSuperLike } = useTinderAnimations(
    onAnimation,
    onSubmit
  );

  function handleReturn() {
    if (isReturnUser) {
      dispatch(returnUserThunk()).then(onSubmit);
    }
  }

  return { handleReturn, handleDislike, handleSuperLike, handleLike };
}
