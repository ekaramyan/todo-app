function AddTodo({ addTodo, todos }) {
  return (
    <>
      <div className="addTodoContainer">
        <input
          className="todoInputText"
          type="text"
          placeholder="Add new todo here..."
          id="todoText"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              // addTodo(todoText.value);
              addTodo(todoText.value)
              todoText.value = '';
              window.location.reload(false); // заглушка
            }
          }}
        />
        <input
          className="todoInputButton"
          type="button"
          value="Add Todo"

          onClick={() => {
            addTodo(todoText.value);
            todoText.value = "";
            window.location.reload(false); //заглушка
          }}
        />
      </div>
    </>
  );
}

export default AddTodo;