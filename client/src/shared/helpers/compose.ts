import type { FC } from 'react';

export function compose(...funcs: Array<(Component: FC) => FC>) {
  return function (arg: FC) {
    return funcs.reduce(
      (acc: FC, func: (Component: FC) => FC) => func(acc),
      arg
    );
  };
}
