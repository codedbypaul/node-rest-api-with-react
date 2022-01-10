import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [todoTitle, setTodoTitle] = useState("");
  const [todoBody, setTodoBody] = useState("");

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/todos")
        .then((response) => response.json())
        .then((data) => setData(data));
    };

    fetchData();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({
        title: todoTitle,
        body: todoBody,
        isComplete: false,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setData([...data, json]);
        setTodoTitle("");
        setTodoBody("");
      });
  };

  const handleIsCompleteChange = (e) => {
    const id = e.target.value;
    const { title, body, isComplete } =
      data.find(({ id: todoId }) => todoId === id) || {};

    fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, title, body, isComplete: !isComplete }),
      headers: { "Content-Type": "application/json" },
    }).then(() =>
      setData(
        data.map((item) =>
          item?.id === id ? { ...item, isComplete: !item.isComplete } : item
        )
      )
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.value;

    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    }).then(() => setData(data.filter((item) => item.id !== id)));
  };

  return (
    <div className="App">
      <header className="p-4">
        <nav>
          <h1 className="text-3xl font-bold">
            <a className="navbar-brand" href="/">
              Todos
            </a>
          </h1>
        </nav>
      </header>
      <main className="container">
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Body</label>
            <input
              type="text"
              value={todoBody}
              onChange={(e) => setTodoBody(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="submit"
              disabled={!todoTitle}
              className="btn btn-primary"
            />
          </div>
        </form>
        {data &&
          data.map(({ id, title, body, isComplete }, i) => (
            <div key={i} className="row">
              <div className="col">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={id}
                  value={id}
                  aria-label="Toggle done"
                  checked={isComplete}
                  onChange={handleIsCompleteChange}
                />
              </div>
              <div className="col">
                <h2 className="App-todo-list-item-title">{title}</h2>
                <p>{body}</p>
              </div>
              <div className="col">
                <button
                  value={id}
                  onClick={handleDelete}
                  className="btn btn-secondary"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
