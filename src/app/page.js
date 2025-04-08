"use client"


export default function Home() {
  function addTodo() {
    const todoElement = document.getElementById("new-todo");
    const todo = todoElement.value;
        todoElement.value = "";

    
    const list = document.getElementById("list");
    const li = document.createElement("li");
    const text = document.createTextNode(todo);
    li.appendChild(text);

    li.setAttribute("onclick", "this.remove()")

    list.style.display = 'block';
    
    list.appendChild(li);

  };

  return (
    <div className="list-container">
        <h2 className="title">NOTES</h2>
        
        <form className="row">
            <label  htmlFor="new-todo">New Item: </label>
            <input className="searchBox" type="text" id="new-todo" name="new-todo" />
            <button className="button" type="button" onClick={addTodo}>Create</button>
        </form>
        <ul className="list" id="list" style={{display: 'none'}}></ul>
    </div>
  )
}