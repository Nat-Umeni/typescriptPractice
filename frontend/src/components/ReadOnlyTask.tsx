import {
    // AiOutlineFileDone,
    AiOutlineDelete,
    AiOutlineEdit
} from 'react-icons/ai';
import { ReadOnlyTaskProps } from '../types/types';

export default function ReadOnlyTask({ task, handleEditTask, handleTaskDelete }: ReadOnlyTaskProps) {
    return (
        <>
            <div>
                <span className="text-white">{task.title}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
                <div>
                    <button
                        aria-label="Edit title"
                        className="flex text-3xl text-white transition-colors duration-200 cursor-pointer hover:text-green-500"
                        onClick={() => task.id && handleEditTask(task.id)}
                    >
                        <AiOutlineEdit title="Edit title" />
                    </button>
                </div>

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
        </>
    );
}
