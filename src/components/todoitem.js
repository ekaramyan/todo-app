function TodoItem({ todo, id, editTodoItem, deleteTodoItem }) {

    if (!todo) {
        return null
    }

    return (
        <>
            <div className="todoItem" key={id}>
                <div className="todoItemText">{todo.ToDoText}</div>
                <div className="todoItemControls">
                    <i className="todoItemControlEdit">
                        <button className="bg-default" onClick={() => editTodoItem(todo)}>
                            Edit
                        </button>
                    </i>
                    <i className="todoItemControlDelete">
                        <button className="bg-danger" onClick={() => deleteTodoItem(todo)}>
                            Del
                        </button>
                    </i>
                </div>
            </div>
        </>
    );
}
export default TodoItem;