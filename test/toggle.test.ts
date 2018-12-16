import { toggle } from "../src";

describe("toggle", () => {
  it("should return a new object", () => {
    const state = { isActive: true };
    const newState = toggle("isActive")(state);

    expect(newState).not.toBe(state);
  });

  it("should not mutate the existing object", () => {
    const state = { isActive: true };
    const newState = toggle("isActive")(state);

    expect(state.isActive).toBe(true);
  });

  it("should toggle the value at the given key in state", () => {
    const state = { isActive: true };
    const newState = toggle("isActive")(state);

    expect(newState.isActive).toBe(false);
  });

  // it('should return state when toggling a key in state that does not exist', () => {
  //   const state = {};
  //   const newState = toggle('isActive')(state);

  //   expect(newState).toEqual(state);
  // })
});
