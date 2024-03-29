import { createContext, useContext, useEffect, useState } from "react";
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

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const addTodo = (todo: TodoProps) => {
    setTodos((prev) => [{ ...todo }, ...prev]);
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

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      const todos = JSON.parse(storedTodos);

      if (Array.isArray(todos) && todos.length > 0) {
        setTodos(todos);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, toggleTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
