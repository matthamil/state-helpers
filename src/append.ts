import { curry, append as ramdaAppend } from "ramda";
import { atKey } from "./utils/atKey";

type State = Record<string, any>;
type StateUpdater = (state: State) => State;

function _append(key: string, value: any): StateUpdater {
  return atKey(key, ramdaAppend(value));
}

export const append = curry(_append);
