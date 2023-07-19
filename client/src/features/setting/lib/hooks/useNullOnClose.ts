import { useEffect } from 'react';
import { useAppDispatch } from '@shared/lib/hooks';
import { nullInput } from '@entities/setting/model';

export function useNullOnClose() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(nullInput());
    };
  }, [dispatch]);
}
