import type { MotionStyle } from 'framer-motion';
import { useTransform, type MotionValue } from 'framer-motion';

interface RateButtonsHighlightingReturn {
  dislikeStyle: MotionStyle;
  superLikeStyle: MotionStyle;
  likeStyle: MotionStyle;
}

export function useRateButtonsStyle(
  x: MotionValue<number>,
  y: MotionValue<number>
): RateButtonsHighlightingReturn {
  const dislikeBackground = useTransform(
    x,
    [-100, -40],
    ['#ff6574ff', '#ff657400']
  );
  const likeBackground = useTransform(x, [40, 100], ['#31ca8f00', '#31ca8fff']);
  const superLikeBackground = useTransform(y, (yValue) => {
    const xValue = x.get();
    if (xValue <= 35 && xValue >= -35 && yValue < -40) {
      return (
        '#429dff' + Math.min(255, Math.floor((yValue + 40) * -4)).toString(16)
      );
    }
    return '#429dff00';
  });
  const dislikeColor = useTransform(x, [-100, -40], ['#ff4458', '#ff6574']);
  const likeColor = useTransform(x, [40, 100], ['#31ca8f', '#129e68']);
  const superLikeColor = useTransform(y, (yValue) => {
    const xValue = x.get();
    if (xValue <= 35 && xValue >= -35 && yValue < -40) {
      return (
        '#1786ff' + Math.min(255, Math.floor((yValue + 40) * -4)).toString(16)
      );
    }
    return '#429dff';
  });

  return {
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
  };
}
