import React, { useReducer, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { TaskItem } from './task_item'; 
import type { Task, TaskAction } from './types'; 
import './taskdashboard.css';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, { id: crypto.randomUUID(), description: action.payload, completed: false }];
        case 'TOGGLE_TASK':
            return state.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t);
        case 'DELETE_TASK':
            return state.filter(t => t.id !== action.payload);
        default:
            return state;
    }
};

export const TaskDashboard: React.FC = () => {
    const [tasks, dispatch] = useReducer(taskReducer, []);
    const [inputValue, setInputValue] = useState('');

    const handleAddTask = () => {
        if (inputValue.trim()) {
            dispatch({ type: 'ADD_TASK', payload: inputValue.trim() });
            setInputValue('');
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-4">
            <Card className="w-full md:w-8 lg:w-6 shadow-4 border-round-xl">
                <div className="flex flex-column gap-4">
                    
                    {/* Cabecera */}
                    <div className="flex align-items-center justify-content-between border-bottom-1 surface-border pb-2">
                        <h2 className="m-0 text-900 font-semibold text-2xl">Gestor de Operaciones</h2>
                        <span className="bg-primary text-primary-contrast font-medium px-3 py-1 border-round-2xl text-sm">
                            {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
                        </span>
                    </div>

                    {/* Formulario de entrada */}
                    <div className="flex gap-2">
                        <IconField iconPosition="left" className="flex-grow-1">
                            <InputIcon className="pi pi-check-square" />
                            <InputText 
                                value={inputValue} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} 
                                placeholder="Añadir nueva tarea..." 
                                className="w-full"
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddTask()} 
                            />
                        </IconField>
                        <Button icon="pi pi-plus" label="Añadir" onClick={handleAddTask} className="p-button-primary" />
                    </div>

                    {/* Lista de tareas */}
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
                                    onToggle={(id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id })} 
                                    onDelete={(id: string) => dispatch({ type: 'DELETE_TASK', payload: id })} 
                                />
                            ))
                        )}
                    </div>

                </div>
            </Card>
        </div>
    );
};