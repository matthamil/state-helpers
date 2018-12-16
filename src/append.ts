type State = Record<string, any>;
type StateUpdater = (state: State) => State;
type Comparator = (value: any) => boolean;
type Updater = (value: any) => any;

export function append(key: string, value: any): StateUpdater {
  return function appendAtKey(state: State): State {
    return {
      ...state,
      [key]: [...state[key], value]
    };
  };
}
