import React from 'react';
import { TaskContextProvider } from './TaskContext';
import { TaskHeader } from './TaskHeader/TaskHeader';
import { TaskInput } from './TaskInput/TaskInput';
import { TaskList } from './TaskList/TaskList';
import styles from './TaskDashboard.module.scss';

// Componente Presentacional: ya no tiene useState ni lógica, solo estructura visual
// La lógica vive en TaskContextProvider, los hijos la consumen con useTaskContext()
export const TaskDashboard: React.FC = () => {
    return (
        <TaskContextProvider>
            <div className={styles["task-dashboard"]}>
                <div className={styles["task-dashboard__card"]}>
                    <div className={styles["task-dashboard__content"]}>

                        <TaskHeader />
                        <TaskInput />
                        <TaskList />

                    </div>
                </div>
            </div>
        </TaskContextProvider>
    );
};