import React from 'react';
import { TaskHeader } from './TaskHeader/TaskHeader';
import { TaskInput } from './TaskInput/TaskInput';
import { TaskList } from './TaskList/TaskList';
import styles from './TaskDashboard.module.scss';

// Componente Presentacional: solo estructura visual, la lógica vive en TaskContextProvider
export const TaskDashboard: React.FC = () => {
    return (
        <div className={styles["task-dashboard"]}>
            <div className={styles["task-dashboard__card"]}>
                <div className={styles["task-dashboard__content"]}>

                    <TaskHeader />
                    <TaskInput />
                    <TaskList />

                </div>
            </div>
        </div>
    );
};