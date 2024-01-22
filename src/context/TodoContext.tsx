import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Todos message",
      completed: false,
    },
  ],
  addTodo: (todo: string) => {},
  updateTodo: (id: number, todo: string) => {},
  deleteTodo: (id: number) => {},
  toggleTodo: (id: number) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
