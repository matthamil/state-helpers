import { lensProp, when, map, curry } from "ramda";
import { overIf } from "./utils/overIf";
import { alter } from "./utils/alter";

type State = Record<string, any>;
type StateUpdater = (state: State) => State;
type Predicate = (value: any) => boolean;
type Updater = (value: any) => any;

function _updateWhere(
  key: string,
  predicate: Predicate,
  updater: Updater
): StateUpdater {
  return overIf(lensProp(key), alter(predicate, updater));
}

export const updateWhere = curry(_updateWhere);
