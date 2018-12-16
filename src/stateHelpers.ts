type State = Record<string, any>;
type StateUpdater = (state: State) => State;
type Comparator = (value: any) => boolean;
type Updater = (value: any) => any;

export { removeWhere } from "./removeWhere";

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
