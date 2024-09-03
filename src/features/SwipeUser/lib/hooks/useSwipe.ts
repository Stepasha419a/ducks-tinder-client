import { useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type Slider from 'react-slick';
import { useAppSelector } from '@shared/lib';
import { useKeyboardEvents } from './useKeyboardEvents';
import { useSwipeProps } from './useSwipeProps';
import { useSwipeStyles } from './useSwipeStyles';

export function useSwipe() {
  const tinderUsersLength = useAppSelector(
    (state) => state.tinder.tinderUsers.length
  );
  const isReturnLoading = useAppSelector(
    (state) => state.tinder.isReturnLoading
  );

  const [isFullPreview, setIsFullPreview] = useState(false);
  const [isLockedSubmission, setIsLockedSubmission] = useState(false);

  const controls = useAnimationControls();

  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    controls.start('center');
  }, [controls, tinderUsersLength]);

  const { isDragRef, x, y, ...motionProps } = useSwipeProps(
    controls,
    !isFullPreview && !isReturnLoading,
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

  const handleBlockActiveDragFullPreview = (value: boolean) => {
    if (isDragRef.current && !isFullPreview) {
      return;
    }
    setIsFullPreview(value);
  };

  const handleSubmitAction = () => {
    setIsFullPreview(false);
  };

  const { statusStyles, rateButtonStyles } = useSwipeStyles(x, y);

  return {
    motionProps,
    previewProps: {
      setIsFullPreview: handleBlockActiveDragFullPreview,
      isFull: isFullPreview,
      isShadow: !isFullPreview,
      sliderRef,
    },
    statusProps: {
      ...statusStyles,
      isFullPreview,
    },
    rateButtonsProps: {
      ...rateButtonStyles,
      isFullPreview,
      handleSubmitAction,
      controls,
    },
  };
}
