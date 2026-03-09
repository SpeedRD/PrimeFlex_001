import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTaskContext } from '../TaskContext'
import styles from './TaskDetail.module.scss';

// Componente Presentacional: muestra el detalle de una tarea usando useParams y el contexto
export const TaskDetail: React.FC = () => {
    // Obtener el id de la tarea desde la URL
    const { idTask } = useParams<{ idTask: string }>();
    const { getTaskById } = useTaskContext();

    const task = idTask ? getTaskById(idTask) : undefined;

    // Si no se encuentra la tarea
    if (!task) {
        return (
            <div className={styles["task-detail"]}>
                <div className={styles["task-detail__card"]}>
                    <div className={styles["task-detail__not-found"]}>
                        <i className="pi pi-exclamation-triangle" />
                        <h2>Tarea no encontrada</h2>
                        <p>La tarea que buscas no existe o fue eliminada.</p>
                        <Link to="/dashboard" className={styles["task-detail__back"]}>
                            <i className="pi pi-arrow-left" />
                            Volver al dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles["task-detail"]}>
            <div className={styles["task-detail__card"]}>

                {/* Link para volver */}
                <Link to="/dashboard" className={styles["task-detail__back"]}>
                    <i className="pi pi-arrow-left" />
                    Volver al dashboard
                </Link>

                {/* Cabecera con estado */}
                <div className={styles["task-detail__header"]}>
                    <span className={`${styles["task-detail__status"]} ${task.completed ? styles["task-detail__status--completed"] : styles["task-detail__status--pending"]}`}>
                        <i className={`pi ${task.completed ? "pi-check-circle" : "pi-clock"}`} />
                        {task.completed ? 'Completada' : 'Pendiente'}
                    </span>
                </div>

                {/* Nombre de la tarea */}
                <h1 className={styles["task-detail__title"]}>
                    {task.description}
                </h1>

                {/* Info adicional */}
                <div className={styles["task-detail__info"]}>
                    <div className={styles["task-detail__info-item"]}>
                        <span className={styles["task-detail__info-label"]}>ID</span>
                        <span className={styles["task-detail__info-value"]}>{task.id}</span>
                    </div>
                    <div className={styles["task-detail__info-item"]}>
                        <span className={styles["task-detail__info-label"]}>Estado</span>
                        <span className={styles["task-detail__info-value"]}>
                            {task.completed ? 'Finalizada' : 'En progreso'}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};