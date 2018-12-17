import { curry } from "ramda";
import { alter } from "./utils/alter";
import { atKey } from "./utils/atKey";

type State = Record<string, any>;
type StateUpdater = (state: State) => State;
type Predicate = (value: any) => boolean;
type Updater = (value: any) => any;

function _updateWhere(
  key: string,
  predicate: Predicate,
  updater: Updater
): StateUpdater {
  return atKey(key, alter(predicate, updater));
}

export const updateWhere = curry(_updateWhere);
