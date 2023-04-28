import type { FC } from 'react';

export function compose<P>(...funcs: Array<(Component: FC<P>) => FC<P>>) {
  return function (arg: FC<P>): FC<P> {
    return funcs.reduce(
      (acc: FC<P>, func: (Component: FC<P>) => FC<P>) => func(acc),
      arg
    );
  };
}
