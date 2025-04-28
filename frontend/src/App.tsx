import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Task } from "./types";
import { IoMdAddCircleOutline, IoMdSave } from "react-icons/io";
import {
  // AiOutlineFileDone,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [editedTitle, setEditedTitle] = useState<string>("");

  const addTask = async (title: string): Promise<void | boolean> => {
    const response = await axios.post("/api/tasks", {
        title: title,
        completed: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      console.error("Error adding task "+ response);
      return false;
    }

    setTasks([...tasks, response.data.task]);

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTask(title);
    setTitle("");
  };

  const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);
  const handleEditTask = (taskId: string|number): void => {
    const task: Task | undefined = tasks.find((task) => task.id === taskId);
    if (task) {
      setTaskBeingEdited(task);
      setEditedTitle(task.title);
    }
  };

  const saveEditedTask = async () => {
    if (!taskBeingEdited) return;

    const task: Task | undefined = tasks.find((task) => task.id === taskBeingEdited.id);

    if (task) {
      task.title = editedTitle;

      try {
        const response = await axios.put(`/api/tasks/${taskBeingEdited.id}`, {
          task: task
        });

        // console.log(response)

        if (response.status !== 200) {
          throw new Error("Error updating task " + response)
        }

      } catch (error) {
        console.error(error);
      }
   
      setTaskBeingEdited(null);
      setEditedTitle("");

      // Update the tasks state

    }
  };

  const handleTaskDelete = (taskId: string|number): void => {
    setTasks((prevTasks: Task[]): Task[] => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };

  // On page load get all the tasks and add them to state
  useEffect(() => {
    axios.get("/api/tasks").then(({ data }) =>{
      setTasks(data)
    });
  }, []);

  // For debugging
  useEffect(() => { 
    console.log(tasks);
  }, [tasks]);

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
                  onInput={(e) => setEditedTitle(e.currentTarget.value)}
                  onBlur={saveEditedTask}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEditedTask();
                    }
                  }}
                  value={editedTitle}
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
                    onClick={() => task.id && handleEditTask(task.id)}
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
                  onClick={() => task.id && handleTaskDelete(task.id)}
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
