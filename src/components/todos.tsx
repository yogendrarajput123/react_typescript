import { useSearchParams } from "react-router-dom";
import { useTodos } from "../store/Todos";

const Todos = () => {
  const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();

  const [searchParams] = useSearchParams();
  const todosData = searchParams.get("todos"); // it get todos from navbar.tsx and also active and completed
  console.log(todosData);

  let filterData = todos;

  // if todos value is active then return the data those does not completed
  if (todosData === "active") {
    filterData = filterData.filter((task) => !task.completed);
  }

  // if todos value is completed then return the data those are completed
  if (todosData === "completed") {
    filterData = filterData.filter((task) => task.completed);
  }

  return (
    <ul>
      {filterData.map((todo) => {
        return (
          <li key={todo.id}>
            {/* Checkbox */}
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={() => toggleTodoAsCompleted(todo.id)} //
            />

            {/* task display */}
            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

            {/* delete button - it show when the task is checked */}
            {todo.completed && (
              <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Todos;
