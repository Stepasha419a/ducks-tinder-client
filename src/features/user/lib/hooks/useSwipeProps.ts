import type { AnimationControls, PanInfo } from 'framer-motion';
import { useMotionValue } from 'framer-motion';
import { useAdaptiveMediaQuery } from '@hooks';
import { useTinderAnimations } from '@entities/user';

export function useSwipeProps(
  controls: AnimationControls,
  isDraggable: boolean
) {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const { handleDislike, handleLike, handleSuperLike } =
    useTinderAnimations(controls);

  function handleDrag(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.y < -25) {
      handleSuperLike();
    } else if (info.offset.x < -25) {
      handleDislike();
    } else if (info.offset.x > 25) {
      handleLike();
    }
  }

  let swipeDistance = Math.max(window.screen.height, window.screen.width);
  if (!isMobile) {
    swipeDistance /= 2;
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
        y: -swipeDistance,
      },
      like: {
        x: swipeDistance,
      },
      dislike: {
        x: -swipeDistance,
      },
    },
    initial: 'center',
    onDragEnd: handleDrag,
  };
}
