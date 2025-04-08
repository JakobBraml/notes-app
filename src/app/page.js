"use client"


export default function Home() {
  function addTodo() {
    const todoElement = document.getElementById("new-todo");
    const todo = todoElement.value;
        todoElement.value = "";

    if(todo.length < 3) {
        return alert("You must have at least 3 characters for your TODO item.");
    }
    const list = document.getElementById("list");
    const li = document.createElement("li");
    const text = document.createTextNode(todo);
    li.appendChild(text);

    li.setAttribute("onclick", "this.remove()")


    list.appendChild(li);

  };

  return (
    <div className="list-container">
        <h2>My Todo List</h2>
        <ul id="list"></ul>
        <form>
            <label htmlFor="new-todo">New Item: </label>
            <input type="text" id="new-todo" name="new-todo" />
            <button type="button" onClick={addTodo}>Create</button>
        </form>
    </div>
  )
}

