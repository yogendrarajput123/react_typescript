import { ReactNode, useContext, useState, createContext } from "react";

export type TodosProviderProps = {
  children: ReactNode;
};

// create a type for the todos we pass in 'TodosContext' for the todos array element

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

// create a type for the data's that we will pass to createContext
// 'Todo' is array of object

export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void; // Call Signature
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {

  const [todos, setTodos] = useState<Todo[]>( () => {
       try {
          const newTodos = localStorage.getItem('todos') || '[]';
          return JSON.parse(newTodos) as Todo[]
       } catch (error) {
        return[]
       }  
  })

  // 1) --- Define 'handleAddTodo()' function of AddTodo.tsx for add task in todo
  //         And declare this in the 'TodosContext' type and 'todosContext.Provider'

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      // console.log('My Previous data : '+ prev);
      // console.log(newTodos);

      // Add newTodos data to Local-Storage
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // 2) --- handle 'toggleTodoAsCompleted()' onChange function of todos.tsx to mark it
  //        completed - And declare this in the 'TodosContext' and 'todosContext.Provider'
  //        and access in the todos.tsx

  const toggleTodoAsCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      // Add completed newTodos data to Local-Storage
      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    });
  };

  // 3) --- handle 'handleDeleteTodo()' onClick function of todos.tsx to delete task
  //         - And declare this in the 'TodosContext' and 'todosContext.Provider'
  //        and access in the todos.tsx

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      const updatedTodos = prev.filter((todo) => todo.id !== id);
      //  console.log(updatedTodos);

      // Add deleted data to Local-Storage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo }}
    >
      {children}
    </todosContext.Provider>
  );
};

// ----  create a consumer  ------------
// Consumer

export const useTodos = () => {
  const todosConsumer = useContext(todosContext);

  if (!todosConsumer) {
    throw new Error("useTodos used outside of Provider");
  }
  return todosConsumer;
};

// now through useTodos we can consume the values of {{todos, handleAddTodo}} in
// AddTodo.tsx
