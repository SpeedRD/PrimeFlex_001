import React from 'react';
import { TaskItem } from './TaskItem/TaskItem';
import { useTaskContext } from '../TaskContext';
import styles from './TaskList.module.scss';

// Componente Dummy: consume del contexto en vez de recibir props
export const TaskList: React.FC = () => {
    const { tasks } = useTaskContext();

    return (
        <div className={styles["task-list"]}>
            {tasks.length === 0 ? (
                <div className={styles["task-list__empty"]}>
                    No hay tareas pendientes.
                </div>
            ) : (
                tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))
            )}
        </div>
    );
};