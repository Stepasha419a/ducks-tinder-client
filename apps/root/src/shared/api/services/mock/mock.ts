import { matchingUserStubs } from './stub';

export const mockStorage = {
  currentMatchingIndex: 0,
  setCurrentMatchingIndex(value: number) {
    if (value >= matchingUserStubs.length) {
      this.currentMatchingIndex = 0;
    } else if (value < 0) {
      this.currentMatchingIndex = matchingUserStubs.length - 1;
    } else {
      this.currentMatchingIndex = value;
    }

    return this.currentMatchingIndex;
  },
};
