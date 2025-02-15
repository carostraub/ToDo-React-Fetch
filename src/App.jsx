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


  const removeTask = (taskId) => {
    console.log("🗑 Eliminando tarea con ID:", taskId);
  
    fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar la tarea en la API");
        }
        return response.text(); // No siempre devuelve JSON
      })
      .then(() => {
        console.log("✅ Tarea eliminada en la API");
        setTasks(tasks.filter((task) => task.id !== taskId)); // Eliminamos la tarea del estado
      })
      .catch((error) => console.error("❌ Error al eliminar la tarea:", error));
  };
  
  



  return (
    <div className="container">
      <h1 className="title">Lista de Tareas</h1>



      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={task.id} className="task-item">
              {task.label}
              <button className="delete-button" onClick={() => removeTask(task.id)}>
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
