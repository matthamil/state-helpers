import { curry, lensProp, reject } from "ramda";
import { overIf } from "./utils/overIf";

type State = Record<string, any>;
type StateUpdater = (state: State) => State;
type Predicate = (value: any) => boolean;

function _removeWhere(key: string, predicate: Predicate): StateUpdater {
  return overIf(lensProp(key), reject(predicate));
}

export const removeWhere = curry(_removeWhere);
