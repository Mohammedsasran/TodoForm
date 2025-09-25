import { useState, useEffect } from "react";

function TodoForm() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (e) => {
    e.preventDefault(); // stop page reload//
    if (!newTask.trim()) return;
    console.log([...tasks, { text: newTask, completed: false }])
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  //Toggle Complete
  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };


  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };


  const editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText && newText.trim() !== "") {
      const updated = [...tasks];
      updated[index].text = newText;
      setTasks(updated);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          My To-Do App
        </h1>

        <form onSubmit={addTask} className="flex mb-4">
          <input
            type="text"
            placeholder="Add task"
            className="border-2 border-gray-300 p-2 rounded-lg w-full"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 ml-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">


          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between  items-center bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                  className="w-4 h-4 cursor-pointer "
                />

              </div>

              <span className={`${task.completed ? "text-green-600 font-bold mx-30"  : ""}`}>
                {task.completed ? `Completed ${task.text}` : task.text}
              </span>





              {!task.completed && (
              <div className="space-x-2">

                
                <button
                  onClick={() => editTask(index)}

                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
              
                
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoForm;
