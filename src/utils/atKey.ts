import { curry, lensProp, over } from "ramda";
import { overIf } from "./overIf";

type State = Record<string, any>;

/**
 * @description
 *   Performs a transformation on the value at the given key for an object
 *   if the key exists
 * @param key - key in object
 * @param fn - transformation that should not mutate
 * @returns state or undefined
 */
export const atKey: (key: string, fn: any) => any = curry(
  (key: string, fn: any) => overIf(lensProp(key), fn)
);

/**
 * @description
 *   Performs a transformation on the value at the given key for an object
 *   regardless if the key exists
 * @param key - key in object
 * @param fn - transformation that should not mutate
 * @returns state
 */
export const dangerouslyAtKey = curry((key: string, fn: any) =>
  over(lensProp(key), fn)
);
