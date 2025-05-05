import type { AnimationControls } from 'framer-motion';

import { useAppDispatch } from '@ducks-tinder-client/common';

import { dislikeUserThunk, likeUserThunk } from '@entities/user';

export function useTinderAnimations(controls: AnimationControls) {
  const dispatch = useAppDispatch();

  function startCenter() {
    setTimeout(() => {
      controls.start('center');
    }, 400);
  }

  function handleLike() {
    controls.start('like');
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
    startCenter();
  }

  function handleSuperLike() {
    controls.start('superLike');
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
    startCenter();
  }

  function handleDislike() {
    controls.start('dislike');
    setTimeout(() => {
      dispatch(dislikeUserThunk());
    }, 300);
    startCenter();
  }

  return { handleLike, handleSuperLike, handleDislike };
}
