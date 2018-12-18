# state-helpers

[![CircleCI](https://circleci.com/gh/matthamil/state-helpers/tree/master.svg?style=svg)](https://circleci.com/gh/matthamil/state-helpers/tree/master) [![Greenkeeper badge](https://badges.greenkeeper.io/matthamil/state-helpers.svg)](https://greenkeeper.io/)

Immutable helpers for performing common operations on data within an object.

## Goals

- Immutably create a new object for each common operation performed on data within objects
- Automatic currying

## Install

```sh
# This package is not yet published.
```

## Usage

```jsx
import { toggle, append, removeWhere, updateWhere } from "state-helpers";

class TodoList extends React.Component {
  state = {
    todos: [ { id: 1, text: "Clean office", isComplete: false } ]
  };

  toggleShowList = () => {
    this.setState(toggle("isShowingTodos"));
  };

  addTodo = todo => {
    this.setState(append("todos", todo));
  };

  deleteTodo = id => {
    this.setState(removeWhere("todos", todo => todo.id === id));
  };

  toggleTodo = id => {
    this.setState(
      updateWhere(
        "todos",
        todo => todo.id === id,
        todoToUpdate => ({
          ...todoToUpdate,
          isComplete: !todoToUpdate.isComplete
        })
      )
    );
  };

  render() {
    const { todos, isShowingTodos } = this.state;

    return (
      <div>
        <CreateTodoForm onSubmit={this.addTodo} />
        {isShowingTodos
          ? todos.map(todo => (
              <Todo
                text={todo.text}
                isComplete={todo.isComplete}
                onDelete={() => this.deleteTodo(todo.id)}
                toggle={() => this.toggleTodo(todo.id)}
              />
            ))
          : null}
        <button onClick={this.toggleShowList}>
          {isShowingTodos ? "Hide" : "Show"}
        </button>
      </div>
    );
  }
}
```

## Documentation

When a key is passed into any helper that does not exist in the object, the original object is returned and no other operations are performed. This allows for safe operations without `undefined` or `null` checks. The library does provide an escape hatch (see [dangerouslyAtKey](#dangerouslyAtKey)) if you do want to perform an operation on a possibly `undefined` or `null` value.

```js
const state = { favoriteFood: "cookies" };
const newState = toggle("isActive")(state); // "isActive" is not a key that exists in the state object

console.log(newState === state); // true
```

## [toggle](src/toggle.ts)

Toggle a boolean value at a given key in an object.

```js
const state = { isActive: false };

const newState = toggle("isActive")(state);
// { isActive: true }
```

## [append](src/append.ts)

Add an item to the end of a list at a given key in an object.

```js
const state = { colors: ["red", "green", "blue"] };

const newState = append("colors", "yellow")(state);
// { colors: [ "red", "green", "blue", "yellow" ] }
```

## [removeWhere](src/removeWhere.ts)

Remove any _n_ number of items from a list in an object at a given key.

```js
const state = {
  users: [
    { id: 1, lastLogin: "today" },
    { id: 2, lastLogin: "yesterday" },
    { id: 3, lastLogin: "yesterday" }
  ]
};

const didLastLoginYesterday = user => user.lastLogin === "yesterday";

const newState = removeWhere("users", didLastLoginYesterday)(state);
// { users: [ { id: 1, lastLogin: 'today' } ] }
```

## [updateWhere](src/updateWhere.ts)

Update any _n_ number of items in a list in an object at a given key. The updater provided is used to create new values in the list.

```js
const state = {
  numbers: [1, 2, 3, 4]
};

const isEven = n => n % 0 === 2;
const square = n => n * n;

const newState = updateWhere("numbers", isEven, square)(state);
// { numbers: [ 1, 4, 3, 16 ] }
```

## [atKey](src/utils/atKey.ts)

Perform a transformation on a value in an object at a given key. If the given key does not exist, the original object is returned. All of the helpers use this internally. Use this function to create your own helper to immutably update an object property.

```js
const state = {
  user: {
    name: "Matt",
    favoriteMovie: "The Big Lebowski"
  }
};

const newState = atKey("user", user => ({
  ...user,
  name: user.name.toUpperCase()
}))(state);
// { user: { name: "MATT", favoriteMovie: "The Big Lebowski" } }
```

If you have nested objects, you can perform transformations within them without worrying about object spread syntax to ensure immutability.

```js
const state = {
  user: {
    name: "Matt",
    favoriteMovie: "The Big Lebowski"
  }
};

const capitalize = str => str.toUpperCase();

const newState = atKey('user', atKey('favoriteMovie', capitalize)))(state);
// { user: { name: "Matt", favoriteMovie: "THE BIG LEBOWSKI" } }
```

When the key in the object does not exist, the original object is returned.

```js
const state = { name: "Matt" };

const capitalize = str => str.toUpperCase();

const newState = atKey("favoriteMovie", capitalize)(state);
// { name: "Matt" }
```

When the object is `undefined`, `atKey` will also return `undefined`.

```js
const state = undefined;

const capitalize = str => str.toUpperCase();

const newState = atKey("favoriteMovie", capitalize)(state);
// undefined
```

## [dangerouslyAtKey](src/utils/dangerouslyAtKey.ts)

Perform a transformation on a value in an object at a given key. If the given key does not exist, the transformation function is still called. If you need to ensure that the key exists before performing the operation, use [atKey](#atKey).

This should only be used in cases where you are absolutely certain that you do not need to ensure that the key exists.

```js
const state = { name: "Matt" };

function getFavoriteMovieIfDoesNotExist(movie) {
  if (!movie) {
    return "The Big Lebowski";
  }
  return movie;
}

const newState = dangerouslyAtKey(
  "favoriteMovie",
  getFavoriteMovieIfDoesNotExist
)(state);
// { name: "Matt", favoriteMovie: "The Big Lebowski" }
```

## Reducers for Redux

You can use `atKey` to remove some of the cruft that comes with using object spread syntax at each level of state to ensure the reducer performs an immutable update.

```js
// Before
const addFavoriteMovieReducer = (state, action) => {
  const { movie } = action.payload;
  
  const favoriteMovies = (state && state.user && state.user.movies) || [];
  
  return {
    ...state,
    user: {
      ...(state && state.user),
      favoriteMovies: [
          ...favoriteMovies,
          movie
      ]
    }
  };
};

const state = {
  user: {
    name: "Matt",
    movies: {
      favoriteGenre: "comedy",
      favoriteMovies: [ "The Big Lebowski", "Pulp Fiction" ]
    }
  }
};

const action = {
  type: "MOVIE/ADD_FAVORITE",
  payload: { movie: "Space Balls" }
};

const newState = addFavoriteMovieReducer(state, action);
// newState.user.movies.favoriteMovies === [ "The Big Lebowski", "Pulp Fiction", "Space Balls" ]
```

This reducer can be rewritten as:

```js
// After
import { compose } from "ramda";
import { atKey } from "state-helpers";

const atFavoriteMovies = compose(
  atKey("user"),
  atKey("favoriteMovies")
);

const addMovie = action => movies => [ ...movies, action.payload.movie ];

const addFavoriteMovieReducer = (state, action) => {
  const addFavoriteMovieFromAction = addMovie(action);
  const addFavoriteMovie = atFavoriteMovies(addFavoriteMovieFromAction);
  return addFavoriteMovie(state);
};

const state = {
  user: {
    name: "Matt",
    movies: {
      favoriteGenre: "comedy",
      favoriteMovies: [ "The Big Lebowski", "Pulp Fiction" ]
    }
  }
};

const action = {
  type: "MOVIE/ADD_FAVORITE",
  payload: { movie: "Space Balls" }
};

const newState = addFavoriteMovieReducer(state, action);
// newState.user.movies.favoriteMovies === [ "The Big Lebowski", "Pulp Fiction", "Space Balls" ]
```

Since `atKey` is a curried function, you can partially apply the key names that you wish to perform an operation on. The composition of these `atKey` functions can be exported and used within multiple reducers if you have reducers that perform operations on the same data in state (e.g. a reducer that adds to a list and another reducer that removes an item from the same list). You can compose *n* number of `atKey` functions to immutably update a field at *n* depth in state.
