// src/App.jsx
import "./style.css";
import { useState } from "react";
import axios from "axios";

// Internal Kubernetes service URL
const API_URL = "http://backend-svc.backend.svc.cluster.local:8081";

export default function App() {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState(0);
  const [tag, setTag] = useState("");

  const [todoList, setTodoList] = useState([]);

  // Fetch Todo list from backend
  const getTodoList = () => {
    axios
      .get(`${API_URL}/TodoList`)
      .then((response) => {
        setTodoList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todo list:", error);
      });
  };

  // Add a new Todo
  const addTodo = () => {
    axios
      .post(`${API_URL}/Add`, {
        todo,
        description,
        deadline,
        priority,
        status,
        tag,
      })
      .then(() => {
        console.log("Todo added successfully");
        getTodoList(); // Refresh list after adding
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  // Delete a Todo by ID
  const deleteTodo = (id) => {
    setTodoList((currentTodos) =>
      currentTodos.filter((t) => t.id !== id)
    );

    axios
      .delete(`${API_URL}/Delete/${id}`)
      .then(() => {
        console.log(`Todo deleted successfully - ID: ${id}`);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const handleSubmit = (e) => e.preventDefault();

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="todo">Todo</label>
          <input
            type="text"
            id="todo"
            onChange={(e) => setTodo(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            onChange={(e) => setDeadline(e.target.value)}
          />

          <label htmlFor="priority">Priority</label>
          <input
            type="number"
            id="priority"
            onChange={(e) => setPriority(e.target.value)}
          />

          <label htmlFor="status">Status (0 for no, 1 for yes)</label>
          <input
            type="number"
            id="status"
            onChange={(e) => setStatus(e.target.value)}
          />

          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            id="tag"
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        <button onClick={addTodo} className="btn">
          Add
        </button>
        <button onClick={getTodoList} className="btn">
          Todo List
        </button>
      </form>

      <h1 className="header">Todo-List</h1>
      <ul className="list">
        {todoList.map((val) => (
          <li key={val.id}>
            <label>
              <input type="checkbox" checked={val.Status} readOnly />
              {val.Todo}
            </label>
            <h2>Deadline: {val.Deadline}</h2>
            <button
              onClick={() => deleteTodo(val.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
