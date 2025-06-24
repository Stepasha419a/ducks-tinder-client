import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import type Slider from 'react-slick';

import { useKeyboardEvents } from './useKeyboardEvents';
import { useSwipeProps } from './useSwipeProps';
import { TinderAnimations } from '@entities/user';
import { useMotionValue } from 'motion/react';

export interface Commands {
  onDislike: () => void;
  onLike: () => void;
  onSuperLike: () => void;
}

export function useSwipe({
  isFullPreview,
  setIsFullPreview,
  disabled,
  onChangeX,
  onChangeY,
  userId,
  onSubmit,
  overriddenAnimation,
}: {
  isFullPreview: boolean;
  setIsFullPreview: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  onChangeX?: (value: number, userId: string) => void;
  onChangeY?: (value: number, userId: string) => void;
  userId: string;
  onSubmit: () => void;
  overriddenAnimation: {
    userId: string;
    animation: TinderAnimations;
  } | null;
}) {
  const [animation, setAnimation] = useState<TinderAnimations>(
    TinderAnimations.Center
  );
  const [isLockedSubmission, setIsLockedSubmission] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sliderRef = useRef<Slider | null>(null);

  const isDraggable = !disabled && !isFullPreview;
  const { isDragRef, ...motionProps } = useSwipeProps(
    animation,
    setAnimation,
    isDraggable,
    isLockedSubmission,
    setIsLockedSubmission,
    x,
    y,
    onSubmit
  );

  useEffect(() => {
    if (overriddenAnimation && userId === overriddenAnimation.userId) {
      setAnimation(overriddenAnimation.animation);
    }
  }, [overriddenAnimation, userId]);

  useEffect(() => {
    x.on('change', (value) => {
      onChangeX?.(value, userId);
    });
    y.on('change', (value) => {
      onChangeY?.(value, userId);
    });
  }, [onChangeX, onChangeY, userId, x, y]);

  const setIsFullPreviewKeyboard = (value: boolean) => {
    if (isDragRef.current && value) {
      setIsLockedSubmission(true);
    }
    setIsFullPreview(value);
  };

  useKeyboardEvents(
    setAnimation,
    setIsFullPreviewKeyboard,
    onSubmit,
    sliderRef,
    disabled
  );

  const handleBlockActiveDragFullPreview = (value: boolean) => {
    if (isDragRef.current && !isFullPreview) {
      return;
    }

    setIsFullPreview(value);
  };

  return {
    motionProps,
    previewProps: {
      setIsFullPreview: handleBlockActiveDragFullPreview,
      isFull: isFullPreview,
      isShadow: !isFullPreview,
      sliderRef,
    },
    statusProps: {
      isFullPreview,
      x,
      y,
    },
  };
}
