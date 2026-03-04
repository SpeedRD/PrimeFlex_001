import React from 'react';
import { TaskItem } from './TaskItem/TaskItem';
import { useTaskContext } from '../TaskContext';

// Componente Dummy: consume del contexto en vez de recibir props
export const TaskList: React.FC = () => {
    const { tasks } = useTaskContext();

    return (
        <div className="task-list-container flex flex-column mt-2 pr-2">
            {tasks.length === 0 ? (
                <div className="text-center text-500 font-italic py-4">
                    No hay tareas pendientes.
                </div>
            ) : (
                tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))
            )}
        </div>
    );
};