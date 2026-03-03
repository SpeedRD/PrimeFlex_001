import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { TaskItem } from './TaskItem'; 
import type { Task } from './Types'; 
import './taskdashboard.css';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

// Estado unificado de la vista en una sola interfaz
interface DashboardState {
    tasks: Task[];
    inputValue: string;
}

export const TaskDashboard: React.FC = () => {
    // Un solo useState para manejar todo el estado de la vista
    const [state, setState] = useState<DashboardState>({
        tasks: [],
        inputValue: '',
    });

    // Añadir tarea y limpiar el input en una sola actualización de estado
    const handleAddTask = () => {
        if (state.inputValue.trim()) {
            setState(prev => ({
                ...prev,
                tasks: [...prev.tasks, { id: crypto.randomUUID(), description: prev.inputValue.trim(), completed: false }],
                inputValue: '',
            }));
        }
    };

    // Alternar el estado completado de una tarea
    const handleToggleTask = (id: string) => {
        setState(prev => ({
            ...prev,
            tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t),
        }));
    };

    // Eliminar tarea por id
    const handleDeleteTask = (id: string) => {
        setState(prev => ({
            ...prev,
            tasks: prev.tasks.filter(t => t.id !== id),
        }));
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-4">
            <Card className="w-full md:w-8 lg:w-6 shadow-4 border-round-xl">
                <div className="flex flex-column gap-4">
                    
                    {/* Cabecera */}
                    <div className="flex align-items-center justify-content-between border-bottom-1 surface-border pb-2">
                        <h2 className="m-0 text-900 font-semibold text-2xl">Gestor de Operaciones</h2>
                        <span className="bg-primary text-primary-contrast font-medium px-3 py-1 border-round-2xl text-sm">
                            {state.tasks.length} {state.tasks.length === 1 ? 'tarea' : 'tareas'}
                        </span>
                    </div>

                    {/* Formulario de entrada */}
                    <div className="flex gap-2">
                        <IconField iconPosition="left" className="flex-grow-1">
                            <InputIcon className="pi pi-check-square" />
                            <InputText 
                                value={state.inputValue} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, inputValue: e.target.value }))} 
                                placeholder="Añadir nueva tarea..." 
                                className="w-full"
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddTask()} 
                            />
                        </IconField>
                        <Button icon="pi pi-plus" label="Añadir" onClick={handleAddTask} className="p-button-primary" />
                    </div>

                    {/* Lista de tareas */}
                    <div className="task-list-container flex flex-column mt-2 pr-2">
                        {state.tasks.length === 0 ? (
                            <div className="text-center text-500 font-italic py-4">
                                No hay tareas pendientes.
                            </div>
                        ) : (
                            state.tasks.map(task => (
                                <TaskItem 
                                    key={task.id} 
                                    task={task} 
                                    onToggle={handleToggleTask} 
                                    onDelete={handleDeleteTask} 
                                />
                            ))
                        )}
                    </div>

                </div>
            </Card>
        </div>
    );
};