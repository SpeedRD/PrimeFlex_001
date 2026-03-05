import React from 'react';
import { useTaskContext } from '../TaskContext';
import styles from './TaskInput.module.scss';

// Componente Dummy: consume del contexto en vez de recibir props
export const TaskInput: React.FC = () => {
    const { inputValue, onInputChange, onAddTask } = useTaskContext();

    // Manejar el submit del formulario, prevenir recarga de página
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        onAddTask();
    };

    return (
        <form onSubmit={handleSubmit} className={styles["task-input"]}>
            <div className={styles["task-input__field"]}>
                <i className={`pi pi-check-square ${styles["task-input__icon"]}`} />
                <input 
                    type="text"
                    value={inputValue} 
                    onChange={(e) => onInputChange(e.target.value)} 
                    placeholder="Añadir nueva tarea..." 
                    className={styles["task-input__text"]}
                />
            </div>
            <button type="submit" className={styles["task-input__button"]}>
                <i className="pi pi-plus" />
                Añadir
            </button>
        </form>
    );
};