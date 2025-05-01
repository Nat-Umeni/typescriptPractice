import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllTasks, addTask, updateTask, deleteTask,  } from './api/tasks';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { Task } from './types/types';


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

            <TaskForm handleSubmit={handleSubmit} title={title} setTitle={setTitle} error={error} />

            <ul className="mt-4 space-y-2">
                {tasks.map((task) => (
                    <TaskItem task={task} editedTitle={editedTitle} setEditedTitle={setEditedTitle} saveEditedTask={saveEditedTask} key={task.id} taskBeingEdited={taskBeingEdited} handleEditTask={handleEditTask} handleTaskDelete={handleTaskDelete}/>
                ))}
            </ul>
        </>
    );
}

export default App;
