import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getIsMobileNavAvailable } from '../helpers';

export function useIsMobileNavAvailable(): boolean {
  const { pathname } = useLocation();

  const isAvailableRef = useRef(true);

  useEffect(() => {
    if (getIsMobileNavAvailable(pathname)) {
      isAvailableRef.current = true;
    } else {
      isAvailableRef.current = false;
    }
  }, [pathname]);

  return isAvailableRef.current;
}
