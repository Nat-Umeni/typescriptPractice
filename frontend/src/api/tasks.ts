import axios from 'axios';
import { Task } from '../types/types';

export const getAllTasks = async () => {
    try {
        const { data } = await axios.get('/api/tasks');
        return data.tasks ?? [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const addTask = async (title: string) => {
    try {
        const data = await axios.post('/api/tasks', {
            title: title,
            completed: false
        });

        return data;

    } catch (error) {
        console.error(error);
    }
};

export const updateTask = async (task: Task): Promise<Task | undefined> => {
    try {
        const { data } = await axios.put(`/api/tasks/${task.id}`, { task });
        return data.task;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const deleteTask = async (id: string | number): Promise<boolean> => {
    try {
        await axios.delete(`/api/tasks/${id}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};