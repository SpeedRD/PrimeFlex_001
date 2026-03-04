import React from 'react';
import { useTaskContext } from '../TaskContext';

// Componente Dummy: consume del contexto en vez de recibir props
export const TaskHeader: React.FC = () => {
    const { tasks } = useTaskContext();

    return (
        <div className="flex align-items-center justify-content-between border-bottom-1 surface-border pb-2">
            <h2 className="m-0 text-900 font-semibold text-2xl">Gestor de Operaciones</h2>
            <span className="bg-primary text-primary-contrast font-medium px-3 py-1 border-round-2xl text-sm">
                {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
            </span>
        </div>
    );
};