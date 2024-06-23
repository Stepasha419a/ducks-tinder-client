import type { AnimationControls, MotionProps, PanInfo } from 'framer-motion';
import { useMotionValue, useTransform } from 'framer-motion';
import type { RefAttributes } from 'react';
import { useRef } from 'react';
import { useAdaptiveMediaQuery } from '@hooks';
import { useTinderAnimations } from '@entities/user';

type SlantSide = 'top' | 'bottom' | null;

export function useSwipeProps(
  controls: AnimationControls,
  isDraggable: boolean
): MotionProps & RefAttributes<HTMLDivElement> {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const slantSide = useRef<SlantSide>(null);
  const rotate = useTransform(x, (xInput) => {
    let newValue = xInput / 20;

    if (xInput > 0) {
      newValue = slantSide.current === 'bottom' ? newValue * -1 : newValue;
    } else if (xInput < 0) {
      newValue = slantSide.current === 'bottom' ? newValue * -1 : newValue;
    }

    return newValue < 0 ? Math.max(-15, newValue) : Math.min(15, newValue);
  });
  const dragItemRef = useRef<HTMLDivElement>(null);

  const { handleDislike, handleLike, handleSuperLike } =
    useTinderAnimations(controls);

  function handleDrag(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.x < -50) {
      handleDislike();
    } else if (info.offset.x > 50) {
      handleLike();
    } else if (info.offset.y < -50) {
      handleSuperLike();
    }
  }

  let swipeDistance = Math.max(window.screen.height, window.screen.width);
  if (!isMobile) {
    swipeDistance /= 2;
  }

  return {
    style: { x, y, rotate, height: '100%', width: '100%' },
    drag: isDraggable,
    dragElastic: 1,
    dragConstraints: { bottom: 0, left: 0, right: 0, top: 0 },
    animate: controls,
    transition: { duration: 0.4 },
    variants: {
      center: { x: 0, y: 0, rotate: 0, transition: { duration: 0 } },
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
    onDragStart(e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
      if (!dragItemRef.current) {
        return;
      }
      const rect = dragItemRef.current.getBoundingClientRect();

      const pointY = info.point.y - rect.y;
      const half = rect.height / 2;
      if (pointY > half) {
        slantSide.current = 'bottom';
      } else {
        slantSide.current = 'top';
      }
    },
    ref: dragItemRef,
  };
}
