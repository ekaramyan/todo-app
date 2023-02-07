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
            console.log(result.data, 'исходный')
        }
        todo_get() //calling function
            .catch(console.error) //catching errors
    }, []);



    const addTodo = async (ToDoText) => {

        console.log(ToDoText)

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
        console.log(todos)
        const newToDoText = prompt("Enter new todo text or description:");
        if (newToDoText != null) {
            const result = await axios.put(link + todo.id, {
                'data': {
                    ToDoText: newToDoText,
                }
            });


            // const moddedTodos = todos.map((_todo) => {
            //     if (_todo.id === todo.id) {
            //         return result.data;
            //     } else {
            //         return _todo;
            //     }
            // });
            const data = todos.data;

            const newTodos = data.map((_todo) => (
                _todo.id === todo.id
                    ? result.data.data
                    : _todo
                    ));

            console.log(newTodos)

            const moddedTodos = {
                data: newTodos,

                meta: { ...todos.meta }
            }

            console.log(moddedTodos)

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