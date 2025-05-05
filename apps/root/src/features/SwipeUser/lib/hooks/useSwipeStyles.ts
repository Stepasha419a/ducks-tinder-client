import type { MotionStyle, MotionValue } from 'framer-motion';
import { useMotionValue, useMotionValueEvent } from 'framer-motion';

interface SwipeStylesReturn {
  statusStyles: {
    dislikeStyle: MotionStyle;
    superLikeStyle: MotionStyle;
    likeStyle: MotionStyle;
  };
  rateButtonStyles: {
    dislikeStyle: MotionStyle;
    superLikeStyle: MotionStyle;
    likeStyle: MotionStyle;
  };
}

export function useSwipeStyles(
  x: MotionValue<number>,
  y: MotionValue<number>
): SwipeStylesReturn {
  const dislikeOpacity = useMotionValue(0);
  const likeOpacity = useMotionValue(0);
  const superLikeOpacity = useMotionValue(0);

  const dislikeBackground = useMotionValue('#ff657400');
  const dislikeColor = useMotionValue('#ff6574');

  const likeBackground = useMotionValue('#31ca8f00');
  const likeColor = useMotionValue('#31ca8f');

  const superLikeBackground = useMotionValue('#429dff00');
  const superLikeColor = useMotionValue('#429dff');

  const handleDislikeStyles = (xVal: number) => {
    if (xVal < -40) {
      dislikeOpacity.set(Math.min(1, (xVal / 100) * -1));
      dislikeBackground.set(
        '#ff6574' + Math.min(255, Math.floor(xVal * -4)).toString(16)
      );
      dislikeColor.set('#ff4458');
    } else if (dislikeOpacity.get() !== 0) {
      dislikeOpacity.set(0);
      dislikeBackground.set('#ff657400');
      dislikeColor.set('#ff6574');
    }
  };

  const handleLikeStyles = (xVal: number) => {
    if (xVal > 40) {
      likeOpacity.set(Math.min(1, xVal / 100));
      likeBackground.set(
        '#31ca8f' + Math.min(255, Math.floor(xVal * 4)).toString(16)
      );
      likeColor.set('#129e68');
    } else if (likeOpacity.get() !== 0) {
      likeOpacity.set(0);
      likeBackground.set('#31ca8f00');
      likeColor.set('#31ca8f');
    }
  };

  const handleSuperLikeStyles = (yVal: number) => {
    const xVal = x.get();
    if (xVal <= 35 && xVal >= -35 && yVal < -40) {
      superLikeOpacity.set(yVal / -60);
      superLikeBackground.set(
        '#429dff' + Math.min(255, Math.floor(yVal * -4)).toString(16)
      );
      superLikeColor.set(
        '#1786ff' + Math.min(255, Math.floor(yVal * -4)).toString(16)
      );
    } else {
      superLikeOpacity.set(0);
      superLikeBackground.set('#429dff00');
      superLikeColor.set('#1786ff');
    }
  };

  useMotionValueEvent(x, 'change', (xVal) => {
    handleDislikeStyles(xVal);
    handleLikeStyles(xVal);
  });
  useMotionValueEvent(y, 'change', (yVal) => {
    handleSuperLikeStyles(yVal);
  });

  return {
    statusStyles: {
      dislikeStyle: { opacity: dislikeOpacity },
      likeStyle: { opacity: likeOpacity },
      superLikeStyle: { opacity: superLikeOpacity },
    },
    rateButtonStyles: {
      dislikeStyle: {
        backgroundColor: dislikeBackground,
        color: dislikeColor,
      },
      superLikeStyle: {
        backgroundColor: superLikeBackground,
        color: superLikeColor,
      },
      likeStyle: {
        backgroundColor: likeBackground,
        color: likeColor,
      },
    },
  };
}
