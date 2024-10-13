import type { ComponentType } from 'react';
import type { HocFunc } from '../interfaces';

export function compose(...funcs: HocFunc[]): HocFunc {
  console.log(funcs);
  return function composedFunc(arg: ComponentType): ComponentType {
    return funcs.reduceRight((acc: ComponentType, fn: HocFunc) => fn(acc), arg);
  };
}
