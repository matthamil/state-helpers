import { curry, isNil, o, over, unless, view } from "ramda";

/**
 * @description
 *   Calls the function provided at the lens's value unless
 *   the value is undefined or null.
 */
export const overIf = curry((lens: any, fn: any) =>
  unless(o(isNil, view(lens)), over(lens, fn))
);
