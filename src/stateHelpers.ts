type State = Record<string, any>;
type StateUpdater = (state: State) => State;
type Comparator = (value: any) => boolean;
type Updater = (value: any) => any;

export function removeWhere(key: string, comparator: Comparator): StateUpdater {
  function inverseComparator(value: any): boolean {
    return !comparator(value);
  }

  return function removeAtKey(state: State): State {
    return {
      ...state,
      [key]: state[key].filter(inverseComparator)
    };
  };
}

export function updateWhere(
  key: string,
  comparator: Comparator,
  updater: Updater
): StateUpdater {
  function updateIfTruthy(item: any): any {
    if (comparator(item)) {
      return updater(item);
    }
    return item;
  }

  return function updateAtKey(state: State): State {
    return {
      ...state,
      [key]: state[key].map(updateIfTruthy)
    };
  };
}
