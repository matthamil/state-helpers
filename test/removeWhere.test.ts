import { removeWhere } from "../src";

describe("removeWhere", () => {
  it("should return a new object", () => {
    const state = {
      colors: ["red", "blue", "green"]
    };

    const isBlue = (color: string): boolean => color === "blue";

    const newState = removeWhere("colors", isBlue)(state);

    expect(newState).not.toBe(state);
  });

  it("should not mutate the existing object", () => {
    const state = {
      colors: ["red", "blue", "green"]
    };

    const isBlue = (color: string): boolean => color === "blue";

    const newState = removeWhere("colors", isBlue)(state);

    expect(state.colors).not.toBe(newState.colors);
  });

  it("should remove item(s) from a list in state at a given key where the predicate returns true given each item in the list", () => {
    const state = {
      colors: ["red", "blue", "green"]
    };

    const hasFourOrMoreCharacters = (color: string): boolean =>
      color.length >= 4;

    const newState = removeWhere("colors", hasFourOrMoreCharacters)(state);

    expect(newState.colors).toEqual(["red"]);
  });

  it("should not change any other values in state", () => {
    const state = {
      colors: ["red", "blue", "green"],
      name: "Bob Ross",
      talent: "painting",
      nestedObj: {
        a: "b",
        c: "d",
        vals: [1, 2, 3]
      }
    };

    const hasFourOrMoreCharacters = (color: string): boolean =>
      color.length >= 4;

    const newState = removeWhere("colors", hasFourOrMoreCharacters)(state);

    const { colors, ...stateWithoutColors } = state;

    expect(newState).toMatchObject(stateWithoutColors);
  });

  it("should return state when removing from a list at a key that does not exist in state", () => {
    const state = { hello: "world" };

    const hasFourOrMoreCharacters = (color: string): boolean =>
      color.length >= 4;

    const newState = removeWhere("colors", hasFourOrMoreCharacters)(state);

    expect(newState).toBe(state);
  });

  it("should return undefined when state is undefined", () => {
    const state: undefined = undefined;

    const hasFourOrMoreCharacters = (color: string): boolean =>
      color.length >= 4;

    const newState = removeWhere("colors", hasFourOrMoreCharacters)(state);

    expect(newState).toBe(undefined);
  });
});
