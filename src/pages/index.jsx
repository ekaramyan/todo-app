import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todolist";
import axios from "axios";

export default function Home() {
    const [todos, setTodos] = useState([]);

    const link = 'http://localhost:1337/api/to-dos/';

    useEffect(() => {
        const todo_get = async () => {
            const result = await axios.get(link); //calling api
            setTodos(result.data); //setting fetched data
        }
        todo_get() //calling function
            .catch(console.error) //catching errors
    }, []);



    const addTodo = async (ToDoText) => {
        if (ToDoText && ToDoText.length > 0) {
            const result = await axios.post(link, {
                "data": {
                    ToDoText: ToDoText,
                }
            }

            )
            const data = {
                data: [...todos.data, result.data.data],
                meta: { ...todos.meta, ...result.data.meta }
            }
            setTodos(data);
        }
    };


    const deleteTodoItem = async (todo, ToDoText) => {

        if (confirm("Do you really want to delete this item?")) {
            await axios.delete(link + todo.id);

            const newTodos = {
                data: todos.data.filter((_todo) => _todo.id !== todo.id),
                meta: { ...todos.meta }
            };

            setTodos(newTodos);
        }
    };

    const editTodoItem = async (todo, ToDoText) => {
        const newToDoText = prompt("Enter new todo text or description:");
        if (newToDoText != null) {
            const result = await axios.put(link + todo.id, {
                'data': {
                    ToDoText: newToDoText,
                }
            });

            const newTodos = todos.data.map((_todo) => (
                _todo.id === todo.id
                    ? result.data.data
                    : _todo
            ));

            const moddedTodos = {
                data: newTodos,

                meta: { ...todos.meta }
            }
            setTodos(moddedTodos);

        };
    }



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
                    todos={todos.data}
                    deleteTodoItem={deleteTodoItem}
                    editTodoItem={editTodoItem}
                />
            </main>
        </div>
    );
}