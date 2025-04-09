import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getIsMobileNavAvailable } from '../helpers';

export function useIsMobileNavAvailable(): boolean {
  const { pathname } = useLocation();

  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (getIsMobileNavAvailable(pathname)) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  }, [pathname]);

  return isAvailable;
}
