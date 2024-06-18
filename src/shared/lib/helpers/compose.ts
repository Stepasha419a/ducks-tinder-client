import type { ComponentType } from 'react';

type Func = (Component: ComponentType) => ComponentType;

export function compose(...funcs: Func[]): Func {
  return function composedFunc(arg: ComponentType): ComponentType {
    return funcs.reduceRight((acc: ComponentType, fn: Func) => fn(acc), arg);
  };
}
