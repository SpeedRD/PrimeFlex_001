import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useTaskContext } from '../../TaskContext';
import type { Task } from '../../Types';

interface TaskItemProps {
    task: Task;
}

// Componente Dummy: recibe la tarea por prop y las acciones del contexto
export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { onToggleTask, onDeleteTask } = useTaskContext();

    return (
        <div className="task-item-enter flex align-items-center justify-content-between p-3 surface-card shadow-1 border-round mb-2 transition-colors transition-duration-200 hover:surface-hover">
            <div className="flex align-items-center gap-3">
                <Checkbox 
                    inputId={task.id}
                    checked={task.completed} 
                    onChange={() => onToggleTask(task.id)} 
                />
                <label 
                    htmlFor={task.id} 
                    className={`cursor-pointer text-lg ${task.completed ? 'line-through text-500' : 'text-800'}`}
                >
                    {task.description}
                </label>
            </div>
            <Button 
                icon="pi pi-trash" 
                severity="danger" 
                text 
                rounded 
                aria-label="Eliminar tarea" 
                onClick={() => onDeleteTask(task.id)}
            />
        </div>
    );
};