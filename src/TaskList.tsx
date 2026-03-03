import React from 'react';
import { TaskItem } from './TaskItem';
import type { Task } from './Types';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

// Componente Dummy: solo depende de sus props para renderizar la lista
export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
    return (
        <div className="task-list-container flex flex-column mt-2 pr-2">
            {tasks.length === 0 ? (
                <div className="text-center text-500 font-italic py-4">
                    No hay tareas pendientes.
                </div>
            ) : (
                tasks.map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        onToggle={onToggle} 
                        onDelete={onDelete} 
                    />
                ))
            )}
        </div>
    );
};