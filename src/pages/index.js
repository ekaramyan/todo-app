import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todolist";
import axios from "axios";

export default function Home() {
    let [todos, setTodos] = useState([]);

    const link = 'http://localhost:1337/api/to-dos';

    useEffect(() => {
        const todo_get = async () => {
            const result = await axios.get(link); //calling api
            setTodos(result.data); //setting fetched data
        }


        todo_get() //calling function


            .catch(console.error) //catching errors
    }, []);


    const addTodo = async (ToDoText) => {

        // console.log(ToDoText)
        // console.log(todos.data)
        // let n = todos.data.length
        // console.log(n)
        // const todo = todos.data[--n]
        // console.log(todo)
        // if (!todo) {
        //     return null
        // }
        // console.log(todo,'q')


        if (ToDoText && ToDoText.length > 0) {
            const result = await axios.post(link, {
                ToDoText: todo
            });
            console.log(result.data)
            setTodos([...todos.data, result.data]);
        }
    };


    const deleteTodoItem = async (todo) => {
        if (confirm("Do you really want to delete this item?")) {
            await axios.delete(link + todo.id);
            const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
            console.log(newTodos);
            setTodos(newTodos);
        }
    };

    const editTodoItem = async (todo) => {
        const newToDoText = prompt("Enter new todo text or description:");
        if (newToDoText != null) {
            const result = await axios.put(link + todo.id, {
                ToDoText: newToDoText,
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
                    todos={todos.data}
                    deleteTodoItem={deleteTodoItem}
                    editTodoItem={editTodoItem}
                />
            </main>
        </div>
    );
}