/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react';

type Func = (Component: FC) => FC;

export function compose(...funcs: Array<Func>): Func {
  return function composedFunc(arg: FC): FC {
    return funcs.reduceRight((acc: FC, fn: Func) => fn(acc), arg);
  };
}
