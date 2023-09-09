import type { Dispatch, SetStateAction } from 'react';
import type { AnimationControls } from 'framer-motion';
import { useEventListener } from '@/shared/lib/hooks';
import { useTinderAnimations } from '@/entities/tinder/lib';

export function useKeyboardEvents(
  controls: AnimationControls,
  setIsFullPreview: Dispatch<SetStateAction<boolean>>
) {
  const { handleDislike, handleLike, handleSuperLike } =
    useTinderAnimations(controls);

  function handleKeyboardEvent(e: KeyboardEvent) {
    switch (e.code) {
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
