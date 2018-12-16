import { append } from "../src";

describe("append", () => {
  it("should return a new object", () => {
    const state = {
      colors: ["red", "blue", "green"]
    };
    const newState = append("colors", "yellow")(state);

    expect(newState).not.toBe(state);
  });

  it("should not mutate the existing object", () => {
    const state = {
      colors: ["red", "blue", "green"]
    };
    const newState = append("colors", "yellow")(state);

    expect(state.colors).not.toBe(newState.colors);
  });

  it("should append an item to a list in state at a given key", () => {
    const state = {
      colors: ["red", "blue", "green"]
    };
    const newState = append("colors", "yellow")(state);

    expect(newState.colors).toEqual(["red", "blue", "green", "yellow"]);
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
    const newState = append("colors", "yellow")(state);

    const { colors, ...stateWithoutColors } = state;

    expect(newState).toMatchObject(stateWithoutColors);
  });

  it("should return state when appending to a list at a key that does not exist in state", () => {
    const state = { hello: "world" };
    const newState = append("colors", "yellow")(state);

    expect(newState).toBe(state);
  });

  it("should return undefined when state is undefined", () => {
    const state: undefined = undefined;
    const newState = append("colors", "yellow")(state);

    expect(newState).toBe(undefined);
  });
});
