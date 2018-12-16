import { when, map, curry } from "ramda";

type Predicate = (value: any) => boolean;
type Updater = (value: any) => any;

export const alter = curry(
  (predicate: Predicate, updater: Updater, items: Array<any>) =>
    map(when(predicate, updater), items)
);
