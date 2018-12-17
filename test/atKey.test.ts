import { atKey } from "../src";

describe("atKey", () => {
  it("should return a new object", () => {
    const state = {
      name: "Greg"
    };

    const capitalize = (name: string): string => name.toUpperCase();

    const newState = atKey("name", capitalize)(state);

    expect(newState).not.toBe(state);
  });

  it("should not mutate the existing object", () => {
    const state = {
      name: "Greg"
    };

    const capitalize = (name: string): string => name.toUpperCase();

    const newState = atKey("name", capitalize)(state);

    expect(state.name).not.toBe(newState.name);
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

    const capitalize = (name: string): string => name.toUpperCase();

    const newState = atKey("name", capitalize)(state);

    const { name, ...stateWithoutName } = state;

    expect(newState).toMatchObject(stateWithoutName);
  });

  it("should return state when the desired key does not exist in state", () => {
    const state = { hello: "world" };

    const capitalize = (name: string): string => name.toUpperCase();

    const newState = atKey("name", capitalize)(state);

    expect(newState).toBe(state);
  });

  it("should return undefined when state is undefined", () => {
    const state: undefined = undefined;

    const capitalize = (name: string): string => name.toUpperCase();

    const newState = atKey("name", capitalize)(state);

    expect(newState).toBe(undefined);
  });
});
