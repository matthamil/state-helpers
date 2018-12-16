import { toggle } from "../src";

describe("toggle", () => {
  it("should return a new object", () => {
    const state = { isActive: true };
    const newState = toggle("isActive")(state);

    expect(newState).not.toBe(state);
  });

  it("should not mutate the existing object", () => {
    const state = { isActive: true };
    toggle("isActive")(state);

    expect(state.isActive).toBe(true);
  });

  it("should toggle the value at the given key in state", () => {
    const state = { isActive: true };
    const newState = toggle("isActive")(state);

    expect(newState.isActive).toBe(false);
  });

  it("should not change any other values in state", () => {
    const state = {
      isActive: true,
      name: "Bob Ross",
      talent: "painting",
      favoriteColors: ["blue", "green"],
      nestedObj: {
        a: "b",
        c: "d",
        vals: [1, 2, 3]
      }
    };

    const { isActive, ...stateWithoutIsActive } = state;

    const newState = toggle("isActive")(state);

    expect(newState).toMatchObject(stateWithoutIsActive);
  });

  it("should return state when toggling a key in state that does not exist", () => {
    const state = { hello: "world" };
    const newState = toggle("isActive")(state);

    expect(newState).toEqual(state);
  });

  it("should return undefined when state is undefined", () => {
    const state: undefined = undefined;
    const newState = toggle("isActive")(state);

    expect(newState).toEqual(undefined);
  });
});
