import { createContext, useContext } from 'react';
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
export const TaskContext = createContext<TaskContextType | null>(null);

// Hook personalizado para consumir el contexto de forma segura
export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext debe usarse dentro de un TaskContext.Provider');
    }
    return context;
};