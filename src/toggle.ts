import { lensProp, not } from "ramda";
import { overIf } from "./utils/overIf";

type State = Record<string, any>;
type StateUpdater = (state: State) => State;

export function toggle(key: string): StateUpdater {
  return overIf(lensProp(key), not);
}
