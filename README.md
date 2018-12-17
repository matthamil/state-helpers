# state-helpers

Immutable helpers for performing common operations on data within an object.

## Goals

- Immutably create a new object for each common operation performed on data within objects
- Automatic currying

## Usage

```jsx
import { toggle, append, removeWhere, updateWhere } from "state-helpers";

class TodoList extends React.Component {
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
