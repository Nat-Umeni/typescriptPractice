import { TaskItemProps } from '../types/types';
import ActiveEditTask from './ActiveEditTask';
import ReadOnlyTask from './ReadOnlyTask';

export default function TaskItem({
    task,
    taskBeingEdited,
    handleEditTask,
    handleTaskDelete,
    editedTitle,
    setEditedTitle,
    saveEditedTask
}: TaskItemProps) {
    return (
        <>
            <div key={task.id} className="flex justify-between items-center p-4 rounded border border-[#646cff]">
                
                    {taskBeingEdited?.id === task.id ? (
                        <ActiveEditTask
                            editedTitle={editedTitle}
                            setEditedTitle={setEditedTitle}
                            saveEditedTask={saveEditedTask}
                        />
                    ) : (
                      <ReadOnlyTask task={task} handleEditTask={handleEditTask} handleTaskDelete={handleTaskDelete}/>
                    )}
              
            </div>
        </>
    );
}
