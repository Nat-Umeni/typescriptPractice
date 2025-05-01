import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllTasks, addTask, updateTask, deleteTask,  } from './api/tasks';
import Error from './components/Error';
import { Task } from './types/types';
import { IoMdAddCircleOutline, IoMdSave } from 'react-icons/io';
import {
    // AiOutlineFileDone,
    AiOutlineDelete,
    AiOutlineEdit
} from 'react-icons/ai';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>('');
    const [editedTitle, setEditedTitle] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (title.trim() === '') {
            setError('Title is required');
            return;
        }

        const response = await addTask(title);

        if (!response) {
            setError('Error occurred while adding task');
            return;
        }

        const task: Task = response.data.task;
        
        setTasks([...tasks, task]);
        setTitle('');
        setError('');
    };

    const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);
    const handleEditTask = (taskToBeEditedID: string | number): void => {
        setError('');
        const task: Task | undefined = tasks.find((task) => task.id === taskToBeEditedID);
        if (!task) {
            setError('A fatal error occurred');
            return;
        }

        setTaskBeingEdited(task);
        setEditedTitle(task.title);
    };

    const saveEditedTask = async () => {
        setError('');
        if (!taskBeingEdited) return;

        const task: Task | undefined = tasks.find((task) => task.id === taskBeingEdited.id);
        if (!task){
            setError('A fatal error occurred, no task was found');
            return;
        }

        if (editedTitle.trim() === '') {
            setError('Title is required');
            return;
        }

        // Get whatever the task was beufore it was edited,
        // and set the title to the one from state
        const updatedTask = { ...task, title: editedTitle };
     
        const result = await updateTask(updatedTask);
        
        if (!result) {
            setError('Error occurred while updating task');
            return;
        }

        setTasks(tasks.map((t) => (t.id === task.id ? result : t)));
        setTaskBeingEdited(null);
        setEditedTitle('');
        
    };

    const handleTaskDelete = async (taskId: string | number): Promise<void> => {
        if (!taskId) {
            setError('A fatal error occurred');
            return;
        }

        try {
            const taskDeleted = await deleteTask(taskId);

            if (!taskDeleted) {
                setError('Error occurred while deleting task');
                return;
            }

            setTasks(tasks.filter((task) => task.id !== taskId));

        } catch (error) {
            setError('Error occurred while deleting task');
            return;
        }
    };

    // On page load get all the tasks and add them to state
    useEffect(() => {
        const fetchData = async () => {
            const tasksFromAPI: Task[] = await getAllTasks();
            setTasks(tasksFromAPI);
        };
        
        fetchData();
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

            <Error message={error} />

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
                                        if (e.key === 'Enter') {
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
