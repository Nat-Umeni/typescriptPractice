import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Task } from "./types";
import { IoMdAddCircleOutline } from "react-icons/io";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const addTask = (title: string) => {
    setTasks([
      ...tasks,
      { id: Date.now().toString(), title, completed: false },
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(title);
    setTitle("");
  };

  const handleTaskComplete = () => {
    
  };

  return (
    <>
      <div className="flex justify-center gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            className="h-24 p-6 transition-[filter] duration-300 will-change-[filter] hover:drop-shadow-[0_0_2em_#646cffaa]"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-24 p-6 transition-[filter] duration-300 will-change-[filter] hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-center text-3xl font-bold mb-4">Add a task</h1>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded border border-gray-300"
            placeholder="Task title"
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 text-white rounded"
          >
            <IoMdAddCircleOutline />
          </button>
        </form>
      </div>

      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center p-4 rounded border border-gray-300"
          >
            <div>{task.title}</div>
            <div>
              <button onClick={handleTaskComplete}>Mark Complete</button>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
