# state-helpers

Helpers for common operations on state for class components in React.

## Goals

* Common CRUD-like behaviors for state.
* Automatic currying

```js
const updateTodoWhere = updateWhere('todos'); // returns fn until all arguments are passed
const updateTodoWithId = updateTodoWhere(todo => todo.id === id);
```

## Usage

```jsx
import { toggle, append, removeWhere, updateWhere } from 'state-helpers';

class TodoList extends React.Component {
  toggleShowList = () => {
    this.setState(toggle('isShowingTodos'));
  };

  addTodo = todo => {
    this.setState(append('todos', todo))
  };

  deleteTodo = id => {
    this.setState(removeWhere('todos', todo => todo.id === id));
  };

  toggleTodo = id => {
    this.setState(
      updateWhere(
        'todos', 
        todo => todo.id === id,
        todoToUpdate => ({ ...todoToUpdate, active: !todoToUpdate.active })
      )
    )
  }

  render() {
    const { todos, isShowingTodos } = this.state;

    return (
      <div>
        <CreateTodoForm onSubmit={this.addTodo} />
        {isShowingTodos ? todos.map(todo => (
          <Todo 
            text={todo.text} 
            isComplete={todo.isComplete}
            onDelete={() => this.deleteTodo(todo.id)}
            toggle={() => this.toggleTodo(todo.id)}
          />
        )) : null}
        <button onClick={this.toggleShowList}>
          {isShowingTodos ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}
```
