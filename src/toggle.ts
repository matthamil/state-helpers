import { not } from "ramda";
import { atKey } from "./utils/atKey";

type State = Record<string, any>;
type StateUpdater = (state: State) => State;

export function toggle(key: string): StateUpdater {
  return atKey(key, not);
}
