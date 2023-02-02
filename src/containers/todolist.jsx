import TodoItem from "../components/todoitem";


const TodoList = ({ todos = [{}], editTodoItem, deleteTodoItem }) => {

    return (
        <div className="todoListContainer">
            <div className="todosText">Todos</div>
            {
                todos
                    // .sort((a, b) => b.created_at.localeCompare(a.created_at))
                    .map((todo, id) => (
                        <TodoItem
                            key={id}
                            todo={todo.attributes}
                            deleteTodoItem={deleteTodoItem}
                            editTodoItem={editTodoItem}
                        />
                    ))
            }
        </div>
    );

}

export default TodoList;