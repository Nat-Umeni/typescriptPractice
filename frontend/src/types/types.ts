export interface Task {
    id: number,
    title: string,
    completed: boolean
};

export interface TaskFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    error: string;
}

export interface TaskItemProps {
    task: Task;
    taskBeingEdited: Task | null;
    editedTitle: string;
    setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
    saveEditedTask: () => void;
    handleEditTask: (taskToBeEditedID: string | number) => void;
    handleTaskDelete: (taskId: string | number) => Promise<void>;
}

export interface ActiveEditTaskProps {
    editedTitle: string;
    setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
    saveEditedTask: () => void;
}

export interface ReadOnlyTaskProps {
    task: Task;
    handleEditTask: (taskToBeEditedID: string | number) => void;
    handleTaskDelete: (taskId: string | number) => Promise<void>;
}