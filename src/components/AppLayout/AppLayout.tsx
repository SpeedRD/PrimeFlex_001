import React from 'react';
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
    children: React.ReactNode;
}

// Componente layout que envuelve toda la aplicación
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className={styles["app-layout"]}>
            {children}
        </div>
    );
};