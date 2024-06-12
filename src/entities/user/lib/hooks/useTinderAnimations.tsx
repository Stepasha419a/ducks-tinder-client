import { useAppDispatch } from '@shared/lib/hooks';
import type { AnimationControls } from 'framer-motion';
import { dislikeUserThunk, likeUserThunk } from '../../model/tinder';

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
