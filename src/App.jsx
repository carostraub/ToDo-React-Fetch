import React, { useState, useEffect } from "react";
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");


  const fetchTasks = () => {
    fetch("https://playground.4geeks.com/todo/users/carolono", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener datos de la API");
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log("📌 Respuesta completa de la API:", JSON.stringify(responseJson, null, 2));

        
        if (responseJson.todos) {
          setTasks(responseJson.todos);
        } else {
          console.error("Error: La API no devolvió una propiedad 'todos'");
        }
      })
      .catch((error) => console.error("Error:", error));
  };





  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Estado actualizado de tasks:", tasks); 
  }, [tasks]);


  const addTask = (e) => {
    if (e.key === "Enter" && newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };


  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1 className="title">Lista de Tareas</h1>

    

      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={task.id} className="task-item">
              {task.label}
              <button className="delete-button" onClick={() => removeTask(index)}>
                <i className="fa-solid fa-minus"></i>
              </button>
            </li>
          ))
        ) : (
          <p className="empty-message">No hay tareas, añadir tareas</p>
        )}
      </ul>
      <input
        type="text"
        className="task-input"
        placeholder="Añadir nueva tarea"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={addTask}
      />

    </div>
  );
}
