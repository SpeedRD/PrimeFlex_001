import React, { useState } from 'react';
import { TaskHeader } from './TaskHeader/TaskHeader';
import { TaskInput } from './TaskInput/TaskInput';
import { TaskList } from './TaskList/TaskList';
import { TaskContext } from './TaskContext';
import type { Task } from './Types';
import styles from './TaskDashboard.module.scss';

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

// Componente Smart: contiene toda la lógica y provee el contexto a los Dummy
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

    // Valor del contexto que se comparte con todos los hijos
    const contextValue = {
        tasks: state.tasks,
        inputValue: state.inputValue,
        onAddTask: handleAddTask,
        onInputChange: handleInputChange,
        onToggleTask: handleToggleTask,
        onDeleteTask: handleDeleteTask,
    };

    return (
        <TaskContext.Provider value={contextValue}>
            <div className={styles["task-dashboard"]}>
                <div className={styles["task-dashboard__card"]}>
                    <div className={styles["task-dashboard__content"]}>

                        <TaskHeader />
                        <TaskInput />
                        <TaskList />

                    </div>
                </div>
            </div>
        </TaskContext.Provider>
    );
};