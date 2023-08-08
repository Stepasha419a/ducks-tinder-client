import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const activeChatRegex = /\/chat\/[a-z0-9]+/i;

export function useIsMobileNavAvailable(): boolean {
  const { pathname } = useLocation();

  const isAvailableRef = useRef(true);

  useEffect(() => {
    if (activeChatRegex.test(pathname)) {
      isAvailableRef.current = false;
    } else {
      isAvailableRef.current = true;
    }
  }, [pathname]);

  return isAvailableRef.current;
}
