import type { Dispatch, RefObject, SetStateAction } from 'react';
import type Slider from 'react-slick';

import { useAppSelector, useEventListener } from '@ducks-tinder-client/common';

import {
  type TinderActions,
  DataRoles,
  type TinderAnimations,
  useTinderAnimations,
} from '@entities/user';

export function useKeyboardEvents(
  setAnimation: Dispatch<SetStateAction<TinderAnimations>>,
  setIsFullPreview: (value: boolean) => void,
  onSubmit: () => void,
  onBeforeAction: (action: TinderActions) => void,
  sliderRef: RefObject<Slider | null>,
  disabled?: boolean
) {
  const tinderUsersLength = useAppSelector(
    (state) => state.tinder.tinderUsers.length
  );

  const { handleDislike, handleLike, handleSuperLike } = useTinderAnimations(
    setAnimation,
    onSubmit,
    onBeforeAction
  );

  function handleKeyboardEvent(e: KeyboardEvent) {
    if (disabled || !tinderUsersLength) {
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
        if (isInteractiveElement(e.target) && !isSuperLikeButton(e.target)) {
          return;
        }

        handleSuperLike();
        break;
    }
  }

  useEventListener('keyup', handleKeyboardEvent);
}

const isInteractiveElement = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName;
  console.log({ tag });

  const interactiveTags = [
    'BUTTON',
    'A',
    'INPUT',
    'TEXTAREA',
    'SELECT',
    'DETAILS',
  ];

  if (interactiveTags.includes(tag)) {
    return true;
  }

  const tabIndex = target.getAttribute('tabindex');
  const role = target.getAttribute('role');

  if (tabIndex !== null && parseInt(tabIndex) >= 0) {
    return true;
  }
  if (role === 'button' || role === 'link') {
    return true;
  }

  return false;
};

const isSuperLikeButton = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLButtonElement)) {
    return false;
  }

  return target.dataset.role === DataRoles.SuperLikeButton;
};
