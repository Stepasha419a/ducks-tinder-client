import type { ComponentType } from 'react';

import type { HocFunc } from '../interfaces';
import { compose } from './compose';

export enum HocCompositionStage {
  BOOTSTRAPPING = 'BOOTSTRAPPING',
  AUTH_CHECK = 'AUTH_CHECK',
  USER_HYDRATION = 'USER_HYDRATION',
  DATA_SYNCING = 'DATA_SYNCING',
  COMPLETE = 'COMPLETE',
}

interface HocStage {
  hocs: HocFunc[];
  stage: HocCompositionStage;
}

export class HocComposition {
  stages = new Map<HocCompositionStage, HocFunc[]>();
  subscribers: Array<() => void> = [];

  constructor(stages: HocStage[] = []) {
    this.stages.set(HocCompositionStage.BOOTSTRAPPING, []);
    this.stages.set(HocCompositionStage.AUTH_CHECK, []);
    this.stages.set(HocCompositionStage.USER_HYDRATION, []);
    this.stages.set(HocCompositionStage.DATA_SYNCING, []);
    this.stages.set(HocCompositionStage.COMPLETE, []);

    stages.forEach((stage) => {
      this.addHocs(stage.stage, stage.hocs, true);
    });
  }

  addHocs(
    stage: HocCompositionStage,
    hocs: HocFunc[],
    skipSubscribers?: boolean
  ) {
    this.stages.set(stage, [...(this.stages.get(stage) ?? []), ...hocs]);

    if (skipSubscribers) {
      this.subscribers.forEach((subscriber) => {
        subscriber();
      });
    }
  }

  appendHocs<T extends ComponentType>(component: T): T {
    const hocs = [
      ...(this.stages.get(HocCompositionStage.COMPLETE) ?? []),
      ...(this.stages.get(HocCompositionStage.DATA_SYNCING) ?? []),
      ...(this.stages.get(HocCompositionStage.USER_HYDRATION) ?? []),
      ...(this.stages.get(HocCompositionStage.AUTH_CHECK) ?? []),
      ...(this.stages.get(HocCompositionStage.BOOTSTRAPPING) ?? []),
    ];

    return compose(...hocs)(component) as T;
  }

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
  }
}
