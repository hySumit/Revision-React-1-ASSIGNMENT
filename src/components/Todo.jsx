import React, { useEffect, useState } from "react";
import axios from "axios";
import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";


const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/todos");
      if (response.data) {
        setTodos(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (newTodo) => {
    try {
      await axios.post("http://localhost:8080/todos", newTodo);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await axios.patch(`http://localhost:8080/todos/${id}`, { status: !status });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Simple Todo App</h2>
      <div>
        <TodoInput handleAdd={handleAdd} />
      </div>
      <div>
        {todos.length > 0 &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Todo;