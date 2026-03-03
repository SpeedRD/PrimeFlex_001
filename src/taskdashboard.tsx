import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { TaskHeader } from './TaskHeader';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import type { Task } from './Types';
import './taskdashboard.css';

// Estado unificado de la vista en una sola interfaz
interface DashboardState {
    tasks: Task[];
    inputValue: string;
}

// Función inicializadora del estado (se ejecuta solo en el primer render)
const createInitialState = (): DashboardState => ({
    tasks: [],
    inputValue: '',
});

// Componente Smart: contiene toda la lógica y el estado, orquesta los componentes Dummy
export const TaskDashboard: React.FC = () => {
    // Un solo useState con función callback para inicializar
    const [state, setState] = useState<DashboardState>(createInitialState);

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

    // Actualizar el valor del input
    const handleInputChange = (value: string) => {
        setState(prev => ({ ...prev, inputValue: value }));
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
                    <TaskHeader taskCount={state.tasks.length} />

                    {/* Formulario de entrada */}
                    <TaskInput 
                        inputValue={state.inputValue} 
                        onInputChange={handleInputChange} 
                        onAddTask={handleAddTask} 
                    />

                    {/* Lista de tareas */}
                    <TaskList 
                        tasks={state.tasks} 
                        onToggle={handleToggleTask} 
                        onDelete={handleDeleteTask} 
                    />

                </div>
            </Card>
        </div>
    );
};