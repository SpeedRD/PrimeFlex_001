import React from 'react';
import { useTaskContext } from '../../TaskContext';
import type { Task } from '../../Types';
import styles from './TaskItem.module.scss';

interface TaskItemProps {
    task: Task;
}

// Componente Dummy: recibe la tarea por prop y las acciones del contexto
export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { onToggleTask, onDeleteTask } = useTaskContext();

    // Clases BEM: bloque base + modificador --completed si la tarea está lista
    const itemClasses = `${styles["task-item"]} ${task.completed ? styles["task-item--completed"] : ""}`;
    const labelClasses = `${styles["task-item__label"]} ${task.completed ? styles["task-item__label--completed"] : ""}`;

    return (
        <div className={itemClasses}>
            <div className={styles["task-item__info"]}>
                <input
                    type="checkbox"
                    id={task.id}
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                    className={styles["task-item__checkbox"]}
                />
                <label htmlFor={task.id} className={labelClasses}>
                    {task.description}
                </label>
            </div>
            <button
                type="button"
                className={styles["task-item__delete"]}
                aria-label="Eliminar tarea"
                onClick={() => onDeleteTask(task.id)}
            >
                <i className="pi pi-trash" />
            </button>
        </div>
    );
};