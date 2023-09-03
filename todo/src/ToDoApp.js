import React, { useState,useEffect } from 'react';
import './ToDoApp.css'; 

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  console.log(localStorage.getItem('tasks'));
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { text: task, completed: false }]); 
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {tasks.map((taskItem, index) => (
          <li
            key={index}
            className={taskItem.completed ? 'completed markable' : 'markable'} // Apply the "markable" class
          >
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={taskItem.completed}
                onChange={() => handleToggleComplete(index)} // Toggle completion when the checkbox is clicked
              />
              <span className="checkmark"></span>
            </label>
            <span className="task-text">
              {taskItem.completed ? (
                <del>{taskItem.text}</del> // Apply strikethrough for completed tasks
              ) : (
                taskItem.text
              )}
            </span>
            <button className="delete-button" onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
