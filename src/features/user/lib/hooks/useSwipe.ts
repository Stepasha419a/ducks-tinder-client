import { useMotionValue, useTransform } from 'framer-motion';
import type { AnimationControls, MotionProps, PanInfo } from 'framer-motion';
import { useRef, useState } from 'react';
import type { Dispatch, RefAttributes, RefObject, SetStateAction } from 'react';
import type Slider from 'react-slick';
import { useAdaptiveMediaQuery } from '@hooks';
import { useTinderAnimations } from '@entities/user';
import { useEventListener } from '@shared/lib/hooks';

export function useSwipe(
  controls: AnimationControls,
  isFullPreview: boolean,
  setIsFullPreview: Dispatch<SetStateAction<boolean>>
) {
  const [isLockedSubmission, setIsLockedSubmission] = useState(false);

  const sliderRef = useRef<Slider>(null);

  const { isDragRef, ...motionProps } = useSwipeProps(
    controls,
    !isFullPreview,
    isLockedSubmission,
    setIsLockedSubmission
  );

  const setIsFullPreviewKeyboard = (value: boolean) => {
    if (isDragRef.current && value) {
      setIsLockedSubmission(true);
    }
    setIsFullPreview(value);
  };
  useKeyboardEvents(controls, setIsFullPreviewKeyboard, sliderRef);

  return { isDragRef, motionProps, sliderRef };
}

type SlantSide = 'top' | 'bottom' | null;

interface ExtraSwipeProps {
  isDragRef: RefObject<boolean>;
}

function useSwipeProps(
  controls: AnimationControls,
  isDraggable: boolean,
  isLockedSubmission: boolean,
  setIsLockedSubmission: Dispatch<SetStateAction<boolean>>
): MotionProps & RefAttributes<HTMLDivElement> & ExtraSwipeProps {
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

  const isDragRef = useRef(false);

  const { handleDislike, handleLike, handleSuperLike } =
    useTinderAnimations(controls);

  function handleDragEnd(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    isDragRef.current = false;
    if (!isDraggable || isLockedSubmission) {
      if (isLockedSubmission) {
        setIsLockedSubmission(false);
      }
      return;
    }
    if (info.offset.x < -50) {
      handleDislike();
    } else if (info.offset.x > 50) {
      handleLike();
    } else if (info.offset.y < -50) {
      handleSuperLike();
    }
  }

  function handleDragStart(
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (!dragItemRef.current) {
      return;
    }
    isDragRef.current = true;

    const rect = dragItemRef.current.getBoundingClientRect();

    const pointY = info.point.y - rect.y;
    const half = rect.height / 2;
    if (pointY > half) {
      slantSide.current = 'bottom';
    } else {
      slantSide.current = 'top';
    }
  }

  let swipeDistance = Math.max(window.screen.height, window.screen.width);
  if (!isMobile) {
    swipeDistance /= 2;
  }

  return {
    isDragRef,
    style: { x, y, rotate, height: '100%', width: '100%' },
    drag: isDraggable && !isLockedSubmission,
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
    onDragEnd: handleDragEnd,
    onDragStart: handleDragStart,
    ref: dragItemRef,
  };
}

function useKeyboardEvents(
  controls: AnimationControls,
  setIsFullPreview: (value: boolean) => void,
  sliderRef: RefObject<Slider>
) {
  const { handleDislike, handleLike, handleSuperLike } =
    useTinderAnimations(controls);

  function handleKeyboardEvent(e: KeyboardEvent) {
    switch (e.code) {
      case 'Space':
        sliderRef.current?.slickNext();
        break;
      case 'ArrowUp':
        controls.set('center');
        setIsFullPreview(true);
        break;
      case 'ArrowDown':
        setIsFullPreview(false);
        break;
      case 'ArrowLeft':
        handleDislike();
        break;
      case 'ArrowRight':
        handleLike();
        break;
      case 'Enter':
        handleSuperLike();
        break;
    }
  }

  useEventListener('keyup', handleKeyboardEvent);
}
