import type { AnimationControls } from 'framer-motion';
import {
  dislikeUserThunk,
  likeUserThunk,
  returnUserThunk,
} from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/lib';

export function useRateButtons(
  controls: AnimationControls,
  handleSubmitAction: () => void
) {
  const dispatch = useAppDispatch();

  const isReturnUser = useAppSelector((state) => state.tinder.isReturnUser);

  function startCenter() {
    handleSubmitAction();
    setTimeout(() => {
      controls.start('center');
    }, 400);
  }

  function handleReturn() {
    if (isReturnUser) {
      dispatch(returnUserThunk());
    }
  }

  function handleLike() {
    controls.start('like');
    startCenter();
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
  }

  function handleDislike() {
    controls.start('dislike');
    startCenter();
    setTimeout(() => {
      dispatch(dislikeUserThunk());
    }, 300);
  }

  function handleSuperLike() {
    controls.start('superLike');
    startCenter();
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
  }

  return { handleReturn, handleDislike, handleSuperLike, handleLike };
}
