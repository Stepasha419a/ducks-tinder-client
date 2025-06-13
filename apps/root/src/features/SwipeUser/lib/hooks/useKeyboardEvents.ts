import type { Dispatch, RefObject, SetStateAction } from 'react';
import type Slider from 'react-slick';

import { useAppSelector, useEventListener } from '@ducks-tinder-client/common';

import { useTinderAnimations } from './useTinderAnimations';
import type { TinderAnimations } from '../constants';

export function useKeyboardEvents(
  setAnimation: Dispatch<SetStateAction<TinderAnimations>>,
  setIsFullPreview: (value: boolean) => void,
  sliderRef: RefObject<Slider | null>
) {
  const tinderUsersLength = useAppSelector(
    (state) => state.tinder.tinderUsers.length
  );

  const { handleDislike, handleLike, handleSuperLike } =
    useTinderAnimations(setAnimation);

  function handleKeyboardEvent(e: KeyboardEvent) {
    if (!tinderUsersLength) {
      return;
    }

    switch (e.code) {
      case 'Space':
        sliderRef.current?.slickNext();
        break;
      case 'ArrowUp':
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
