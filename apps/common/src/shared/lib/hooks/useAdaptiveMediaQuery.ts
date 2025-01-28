import { useCallback, useEffect, useState } from 'react';

interface MsFriendlyNavigator extends Navigator {
  msMaxTouchPoints?: number;
}

const getMatches = (queryMedia: string): boolean => {
  const navigator = window.navigator as MsFriendlyNavigator;
  const matches = window.matchMedia(queryMedia).matches;

  if ('maxTouchPoints' in navigator || 'msMaxTouchPoints' in navigator) {
    const hasTouchScreen =
      Math.max(navigator.maxTouchPoints, navigator.msMaxTouchPoints || 0) > 0;
    return hasTouchScreen || matches;
  }

  return matches;
};

export function useAdaptiveMediaQuery(query: string): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(getMatches(query));

  const handleChange = useCallback(() => {
    setIsMobile(getMatches(query));
  }, [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [handleChange, query]);

  return isMobile;
}
