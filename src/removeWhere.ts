import { curry, reject } from "ramda";
import { atKey } from "./utils/atKey";

type State = Record<string, any>;
type StateUpdater = (state: State) => State;
type Predicate = (value: any) => boolean;

/**
 * @description
 *   Find and remove all items in a list in state where the predicate returns true
 *
 *   To remove only the first item in the list where the predicate returns true, use removeFirst
 * @param key - state key
 * @param predicate - comparator function that is called for each item in the list at key
 * @returns state
 */
function _removeWhere(key: string, predicate: Predicate): StateUpdater {
  return atKey(key, reject(predicate));
}

export const removeWhere = curry(_removeWhere);
