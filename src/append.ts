import { lensProp, append as ramdaAppend } from "ramda";
import { overIf } from "./utils/overIf";

type State = Record<string, any>;
type StateUpdater = (state: State) => State;
type Comparator = (value: any) => boolean;
type Updater = (value: any) => any;

export function append(key: string, value: any): StateUpdater {
  return overIf(lensProp(key), ramdaAppend(value));
}
