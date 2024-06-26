import type { MotionStyle, MotionValue } from 'framer-motion';
import { useTransform } from 'framer-motion';

interface SwipeStatusStyleReturn {
  dislikeStyle: MotionStyle;
  superLikeStyle: MotionStyle;
  likeStyle: MotionStyle;
}

export function useSwipeStatusStyle(
  x: MotionValue<number>,
  y: MotionValue<number>
): SwipeStatusStyleReturn {
  const dislikeOpacity = useTransform(x, [-100, -40], [1, 0]);
  const likeOpacity = useTransform(x, [40, 100], [0, 1]);
  const superLikeOpacity = useTransform(y, (yValue) => {
    const xValue = x.get();
    if (xValue <= 35 && xValue >= -35) {
      return yValue / -60;
    }
    return 0;
  });

  return {
    dislikeStyle: { opacity: dislikeOpacity },
    likeStyle: { opacity: likeOpacity },
    superLikeStyle: { opacity: superLikeOpacity },
  };
}
