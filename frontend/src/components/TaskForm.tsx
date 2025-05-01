import Error from './Error';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { TaskFormProps } from '../types/types';

export default function TaskForm({ handleSubmit, title, setTitle, error }: TaskFormProps) {
    return (
        <>
            <div>
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
            </div>
            <Error message={error} />
        </>
    );
}
