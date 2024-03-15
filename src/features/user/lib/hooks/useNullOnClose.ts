import { useEffect } from 'react';
import { useAppDispatch } from '@shared/lib/hooks';
import { nullInput } from '@entities/user/model/setting';

export function useNullOnClose() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(nullInput());
    };
  }, [dispatch]);
}
