import type { AnimationControls } from 'framer-motion';
import type { RefObject } from 'react';
import type Slider from 'react-slick';
import { useEventListener } from '@hooks';
import { useTinderAnimations } from './useTinderAnimations';

export function useKeyboardEvents(
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
