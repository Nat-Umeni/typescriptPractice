import { ActiveEditTaskProps } from '../types/types';
import { IoMdSave } from 'react-icons/io';

export default function ActiveEditTask({ editedTitle, setEditedTitle, saveEditedTask }: ActiveEditTaskProps) {
    return (
        <>
            <div>
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
            </div>

            <div className="flex items-center justify-between gap-2">
                <button
                    aria-label="Save edited task"
                    className="flex text-3xl text-white transition-colors duration-200 cursor-pointer hover:text-green-500"
                    onClick={saveEditedTask}
                >
                    <IoMdSave title="Save edited task" />
                </button>
            </div>
        </>
    );
}
