import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import type { Task } from './Types'; 

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

// Componente Dummy: recibe un task
export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <div className="task-item-enter flex align-items-center justify-content-between p-3 surface-card shadow-1 border-round mb-2 transition-colors transition-duration-200 hover:surface-hover">
            <div className="flex align-items-center gap-3">
                <Checkbox 
                    inputId={task.id}
                    checked={task.completed} 
                    onChange={() => onToggle(task.id)} 
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
                onClick={() => onDelete(task.id)}
            />
        </div>
    );
};