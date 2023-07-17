import type { AnimationControls, PanInfo } from 'framer-motion';
import { useMotionValue } from 'framer-motion';
import { dislikeUserThunk, likeUserThunk } from '@entities/tinder/model';
import { useAppDispatch } from '@shared/hooks';

export function useSwipeProps(
  controls: AnimationControls,
  isDraggable: boolean
) {
  const dispatch = useAppDispatch();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function startCenter() {
    setTimeout(() => {
      controls.start('center');
    }, 400);
  }

  function handleLike() {
    setTimeout(() => {
      dispatch(likeUserThunk());
    }, 300);
  }

  function handleDislike() {
    setTimeout(() => {
      dispatch(dislikeUserThunk());
    }, 300);
  }

  function handleDrag(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.y < -100) {
      controls.start('superLike');
      startCenter();
      handleLike();
    } else if (info.offset.x < -100) {
      controls.start('dislike');
      startCenter();
      handleDislike();
    } else if (info.offset.x > 100) {
      controls.start('like');
      startCenter();
      handleLike();
    }
  }

  return {
    style: { x, y, height: '100%', width: '100%' },
    drag: isDraggable,
    dragElastic: 1,
    dragConstraints: { bottom: 0, left: 0, right: 0, top: 0 },
    animate: controls,
    transition: { duration: 0.4 },
    variants: {
      center: { x: 0, y: 0, transition: { duration: 0 } },
      superLike: {
        y: -window.screen.height,
      },
      like: {
        x: window.screen.width,
      },
      dislike: {
        x: -window.screen.width,
      },
    },
    initial: 'center',
    onDragEnd: handleDrag,
  };
}
