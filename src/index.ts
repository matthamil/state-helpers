type State = Record<string, any>;
type StateUpdater = (state: State) => State;
type Comparator = (value: any) => boolean;
type Updater = (value: any) => any;

function toggle(key: string): StateUpdater {
  return function toggleAtKey(state: State): State {
    return {
      ...state,
      [key]: !state[key]
    };
  };
}

function append(key: string, value: any): StateUpdater {
  return function appendAtKey(state: State): State {
    return {
      ...state,
      [key]: [...state[key], value]
    };
  };
}

function removeWhere(key: string, comparator: Comparator): StateUpdater {
  function inverseComparator(value: any): boolean {
    return !comparator(value);
  }

  return function removeAtKey(state: State): State {
    return {
      ...state,
      [key]: state[key].filter(inverseComparator)
    };
  };
}

function updateWhere(
  key: string,
  comparator: Comparator,
  updater: Updater
): StateUpdater {
  function updateIfTruthy(item: any): any {
    if (comparator(item)) {
      return updater(item);
    }
    return item;
  }

  return function updateAtKey(state: State): State {
    return {
      ...state,
      [key]: state[key].map(updateIfTruthy)
    };
  };
}

const state = {
  isActive: true,
  favoriteMovies: ["Titanic", "Super Bad"],
  orders: [
    { id: 1, genre: "comedy", title: "Mr. Funny Man" },
    { id: 2, genre: "action", title: "Big Explosions" },
    { id: 3, genre: "comedy", title: "No Laughing Matter" }
  ]
};

const toggledState = toggle("isActive")(state);
console.log(toggledState);

const newMovieState = append("favoriteMovies", "Men in Black")(toggledState);
console.log(newMovieState);

const noComedyState = removeWhere("orders", movie => movie.genre === "comedy")(
  newMovieState
);
console.log(noComedyState);
