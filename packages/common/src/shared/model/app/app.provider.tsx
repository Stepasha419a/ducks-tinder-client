import { useEffect, useMemo, useState } from 'react';
import type { AppContextValue } from './app.interface';
import { AppContext } from './app.context';

interface Props {
  userId?: string | null;
}

export const AppContextProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  userId,
}) => {
  const [internalUserId, setInternalUserId] = useState(userId);

  useEffect(() => {
    setInternalUserId(userId);
  }, [userId]);

  const value: AppContextValue = useMemo(
    () => ({ userId: internalUserId || null, setUserId: setInternalUserId }),
    [internalUserId, setInternalUserId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
