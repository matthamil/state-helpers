import { curry, isNil, o, over, unless, view } from "ramda";

export const overIf = curry((lens: any, fn: any) =>
  unless(o(isNil, view(lens)), over(lens, fn))
);
