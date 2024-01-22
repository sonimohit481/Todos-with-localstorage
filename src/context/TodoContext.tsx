import { createContext, useContext, useState } from "react";
export interface TodoProps {
  id: number;
  todo: string;
  completed: boolean;
}
export interface TodoContextProps {
  todos: TodoProps[];
  addTodo: (todo: TodoProps) => void;
  updateTodo: (id: number, updatedTodo: TodoProps) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined
);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoProps[]>([
    {
      id: 1,
      todo: "Todos message",
      completed: false,
    },
  ]);

  const addTodo = (todo: TodoProps) => {
    setTodos((prev) => [{ ...todo, id: Date.now() }, ...prev]);
  };

  const updateTodo = (id: number, updatedTodo: TodoProps) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? updatedTodo : prevTodo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, toggleTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
