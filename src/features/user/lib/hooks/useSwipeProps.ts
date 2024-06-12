import { useTinderAnimations } from '@entities/user/lib';
import type { AnimationControls, PanInfo } from 'framer-motion';
import { useMotionValue } from 'framer-motion';

export function useSwipeProps(
  controls: AnimationControls,
  isDraggable: boolean
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const { handleDislike, handleLike, handleSuperLike } =
    useTinderAnimations(controls);

  function handleDrag(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.y < -100) {
      handleSuperLike();
    } else if (info.offset.x < -100) {
      handleDislike();
    } else if (info.offset.x > 100) {
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
