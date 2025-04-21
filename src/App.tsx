import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";
import { Task } from "./types";
import { IoMdAddCircleOutline, IoMdSave } from "react-icons/io";
import {
  AiOutlineFileDone,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");

  const addTask = (title: string): void => {
    setTasks([
      { id: Date.now().toString(), title, completed: false },
      ...tasks,
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTask(title);
    setTitle("");
  };

  // const handleTaskComplete = (taskId: string) => {
  //   setTasks(() => {
  //     return tasks.map((task) => {
  //       if (task.id === taskId) {
  //         return { ...task, completed: true };
  //       }
  //       return task;
  //     });
  //   });
  // };

  const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);
  const handleEditTask = (taskId: string): void => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setTaskBeingEdited(task);
      setEditTitle(task.title);
    }
  };

  const saveEditedTask = () => {
    if (!taskBeingEdited) return;

    const task = tasks.find((task) => task.id === taskBeingEdited.id);
    
    if (task) {
      task.title = editTitle;
      setTaskBeingEdited(null);
      setEditTitle("");
    }
  };

  const handleTaskDelete = (taskId: string): void => {
    setTasks((prevTasks: Task[]): Task[] => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };

  useEffect(() => {
    axios.get("/api/test").then((response) => console.log(response));
  }, []);

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold text-center">Add a task</h1>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#646cff] transition-all duration-200"
            placeholder="Task title"
            onInput={(e) => setTitle(e.currentTarget.value)}
            value={title}
          />
          <button
            type="submit"
            aria-label="Add task"
            className="text-3xl text-white transition-colors duration-200 cursor-pointer hover:text-green-500"
          >
            <IoMdAddCircleOutline title="Add task" />
          </button>
        </form>
      </div>

      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center p-4 rounded border border-[#646cff]"
          >
            <div>
              {taskBeingEdited?.id === task.id ? (
                <input
                  type="text"
                  className="flex-1 px-4 py-2 rounded bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#646cff] transition-all duration-200"
                  placeholder="Task title"
                  onInput={(e) => setEditTitle(e.currentTarget.value)}
                  onBlur={saveEditedTask}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEditedTask(); 
                    }
                  }}
                  value={editTitle}
                />
              ) : (
                <span className="text-white">{task.title}</span>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <div>
                {taskBeingEdited?.id === task.id ? (
                  <button
                    aria-label="Save edited task"
                    className="flex text-3xl text-white transition-colors duration-200 cursor-pointer hover:text-green-500"
                    onClick={saveEditedTask}
                  >
                    <IoMdSave title="Save edited task" />
                  </button>
                ) : (
                  <button
                    aria-label="Edit title"
                    className="flex text-3xl text-white transition-colors duration-200 cursor-pointer hover:text-green-500"
                    onClick={() => handleEditTask(task.id)}
                  >
                    <AiOutlineEdit title="Edit title" />
                  </button>
                )}
              </div>
              {/* <div>
                <button
                  aria-label="Mark Complete"
                  className="flex text-3xl text-white transition-colors duration-200 cursor-pointer hover:text-green-500"
                  onClick={() => handleTaskComplete(task.id)}
                >
                  <AiOutlineFileDone title="Mark as complete" />
                </button>
              </div> */}
              <div>
                <button
                  aria-label="Delete Task"
                  className="flex text-3xl text-white transition-colors duration-200 cursor-pointer hover:text-red-500"
                  onClick={() => handleTaskDelete(task.id)}
                >
                  <AiOutlineDelete title="Delete task" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
