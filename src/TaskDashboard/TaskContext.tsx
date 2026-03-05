import React, { createContext, useContext, useState } from 'react';
import type { Task } from './Types';

// Interfaz con todo lo que comparte el contexto
interface TaskContextType {
    tasks: Task[];
    inputValue: string;
    onAddTask: () => void;
    onInputChange: (value: string) => void;
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
}

// Crear el contexto con valor inicial null
const TaskContext = createContext<TaskContextType | null>(null);

// Estado unificado de la vista
interface DashboardState {
    tasks: Task[];
    inputValue: string;
}

// Función inicializadora del estado (se ejecuta solo en el primer render)
const createInitialState = (): DashboardState => ({
    tasks: [],
    inputValue: '',
});

// Componente Provider: contiene TODA la lógica de negocio y la provee a sus hijos
export const TaskContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

    // Valor del contexto que se comparte con todos los hijos
    const contextValue: TaskContextType = {
        tasks: state.tasks,
        inputValue: state.inputValue,
        onAddTask: handleAddTask,
        onInputChange: handleInputChange,
        onToggleTask: handleToggleTask,
        onDeleteTask: handleDeleteTask,
    };

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
};

// Hook personalizado para consumir el contexto de forma segura
export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext debe usarse dentro de un TaskContextProvider');
    }
    return context;
};