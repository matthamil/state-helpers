import { updateWhere } from "../src";

describe("updateWhere", () => {
  it("should return a new object", () => {
    const state = {
      colors: ["red", "blue", "green"]
    };

    const isBlue = (color: string): boolean => color === "blue";

    const capitalize = (color: string): string => color.toUpperCase();

    const newState = updateWhere("colors", isBlue, capitalize)(state);

    expect(newState).not.toBe(state);
  });

  it("should not mutate the existing object", () => {
    const state = {
      colors: ["red", "blue", "green"]
    };

    const isBlue = (color: string): boolean => color === "blue";

    const capitalize = (color: string): string => color.toUpperCase();

    const newState = updateWhere("colors", isBlue, capitalize)(state);

    expect(state.colors).not.toBe(newState.colors);
    expect(state.colors).not.toEqual(newState.colors);
  });

  it("should create a new list in state at a given key where the transformation is applied to each item in the list where the predicate returns true", () => {
    const state = {
      colors: ["red", "blue", "green"]
    };

    const hasFourOrMoreCharacters = (color: string): boolean =>
      color.length >= 4;

    const capitalize = (color: string): string => color.toUpperCase();

    const newState = updateWhere("colors", hasFourOrMoreCharacters, capitalize)(
      state
    );

    expect(newState.colors).toEqual(["red", "BLUE", "GREEN"]);
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

    const capitalize = (color: string): string => color.toUpperCase();

    const newState = updateWhere("colors", hasFourOrMoreCharacters, capitalize)(
      state
    );

    const { colors, ...stateWithoutColors } = state;

    expect(newState).toMatchObject(stateWithoutColors);
  });

  it("should return state when the provided key does not exist in state", () => {
    const state = { hello: "world" };

    const hasFourOrMoreCharacters = (color: string): boolean =>
      color.length >= 4;

    const capitalize = (color: string): string => color.toUpperCase();

    const newState = updateWhere("colors", hasFourOrMoreCharacters, capitalize)(
      state
    );

    expect(newState).toBe(state);
  });

  it("should return undefined when state is undefined", () => {
    const state: undefined = undefined;

    const hasFourOrMoreCharacters = (color: string): boolean =>
      color.length >= 4;

    const capitalize = (color: string): string => color.toUpperCase();

    const newState = updateWhere("colors", hasFourOrMoreCharacters, capitalize)(
      state
    );

    expect(newState).toBe(undefined);
  });
});
