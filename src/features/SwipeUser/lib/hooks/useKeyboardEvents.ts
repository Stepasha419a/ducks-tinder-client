import type { AnimationControls } from 'framer-motion';
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';
import type Slider from 'react-slick';
import { useAppSelector, useEventListener } from '@shared/lib';
import { useTinderAnimations } from './useTinderAnimations';

export function useKeyboardEvents(
  controls: AnimationControls,
  setIsFullPreview: (value: boolean) => void,
  sliderRef: RefObject<Slider>
) {
  const isLoading = useAppSelector((state) => state.tinder.isLoading);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  useEffect(() => {
    setIsLocalLoading(isLoading);
  }, [isLoading]);

  const { handleDislike, handleLike, handleSuperLike } =
    useTinderAnimations(controls);

  function handleKeyboardEvent(e: KeyboardEvent) {
    if (isLocalLoading) {
      return;
    }

    setIsLocalLoading(true);

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
