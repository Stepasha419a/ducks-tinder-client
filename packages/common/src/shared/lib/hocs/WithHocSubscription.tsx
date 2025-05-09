import type { ComponentType } from 'react';
import { useEffect, useMemo, useReducer } from 'react';

import type { HocComposition } from '../helpers';

export function WithHocSubscription(
  composition: HocComposition,
  Component: ComponentType
) {
  const Wrapper = () => {
    const [value, forceUpdate] = useReducer((x: number) => x + 1, 0);

    useEffect(() => {
      composition.subscribe(() => {
        forceUpdate();
      });
    }, []);

    const ComposedComponent = useMemo(
      () => composition.appendHocs(Component),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [value]
    );

    return <ComposedComponent />;
  };

  return Wrapper;
}
