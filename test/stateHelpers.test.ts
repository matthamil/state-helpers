import { toggle } from "../src";

describe("stateHelpers", () => {
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
});

// const state = {
//   isActive: true,
//   favoriteMovies: ["Titanic", "Super Bad"],
//   orders: [
//     { id: 1, genre: "comedy", title: "Mr. Funny Man" },
//     { id: 2, genre: "action", title: "Big Explosions" },
//     { id: 3, genre: "comedy", title: "No Laughing Matter" }
//   ]
// };

// const toggledState = toggle("isActive")(state);
// console.log(toggledState);

// const newMovieState = append("favoriteMovies", "Men in Black")(toggledState);
// console.log(newMovieState);

// const noComedyState = removeWhere("orders", movie => movie.genre === "comedy")(
//   newMovieState
// );
// console.log(noComedyState);
