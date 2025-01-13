import type { ComponentType } from 'react';
import type { HocFunc } from '../interfaces';
import { compose } from './compose';

export class HocComposition {
  hocs: HocFunc[];
  subscribers: Array<() => void> = [];

  constructor(hocs: HocFunc[] = []) {
    this.hocs = hocs;
  }

  addHocs(hocs: HocFunc[]) {
    this.hocs = this.hocs.concat(hocs);

    this.subscribers.forEach((subscriber) => {
      subscriber();
    });
  }

  appendHocs<T extends ComponentType>(component: T): T {
    return compose(...this.hocs)(component) as T;
  }

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
  }
}
