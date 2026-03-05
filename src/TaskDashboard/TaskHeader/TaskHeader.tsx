import React from 'react';
import { useTaskContext } from '../TaskContext';
import styles from './TaskHeader.module.scss';

// Componente Dummy: consume del contexto en vez de recibir props
export const TaskHeader: React.FC = () => {
    const { tasks } = useTaskContext();

    return (
        <div className={styles["task-header"]}>
            <h2 className={styles["task-header__title"]}>Gestor de Operaciones</h2>
            <span className={styles["task-header__badge"]}>
                {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
            </span>
        </div>
    );
};