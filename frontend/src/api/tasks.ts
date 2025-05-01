import axios from 'axios';
import { Task } from '../types/types';

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