import TodoItem from "../components/todoitem";


const TodoList = ({ todos = [], editTodoItem, deleteTodoItem }) => {
    return (
        <div className="todoListContainer">
            <div className="todosText">Todos</div>
            {
                todos
                .sort((a, b) => b.attributes.createdAt.localeCompare(a.attributes.createdAt))
                    .map((todo, id) => (
                        <TodoItem
                            key={id}
                            todo={todo}
                            deleteTodoItem={deleteTodoItem}
                            editTodoItem={editTodoItem}
                        />
                    ))
            }
        </div>
    );

}

export default TodoList;