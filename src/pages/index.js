import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todolist";
import axios from "axios";

export default function Home() {
  const api = 'http://localhost:1337/api/to-dos';

  const [todos, setTodos] = useState([]);




  useEffect(() => {
    const todo_get = async () => {
      const result = await axios.get(api); //calling api
      setTodos(result?.data); //setting fetched data
    }

    todo_get() //calling function

      .catch(console.error) //catching errors

  }, []);

  const addTodo = async (todoText) => {
    if (todoText && todoText.length > 0) {
      const result = await axios.post(api, {
        todoText: todoText,
      });
      setTodos([...todos, result?.data]);
    }
  };

  const deleteTodoItem = async (todo) => {
    if (confirm("Do you really want to delete this item?")) {
      await axios.delete(api + todo.id);
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      console.log(newTodos);
      setTodos(newTodos);
    }
  };

  const editTodoItem = async (todo) => {
    const newTodoText = prompt("Enter new todo text or description:");
    if (newTodoText != null) {
      const result = await axios.put(api + todo.id, {
        todoText: newTodoText,
      });
      const moddedTodos = todos.map((_todo) => {
        if (_todo.id === todo.id) {
          return result?.data;
        } else {
          return _todo;
        }
      });
      setTodos(moddedTodos);
    }
  };

  return (
    <div>
      <Head>
        <title>ToDo app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
        />
      </main>
    </div>
  );
}