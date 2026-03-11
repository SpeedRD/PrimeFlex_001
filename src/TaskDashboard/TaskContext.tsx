import React, { createContext, useContext, useState, useEffect } from 'react';
import TaskRepositoryFactory from '../data/repository/TaskRepository/TaskRepositoryFactory';
import type { TaskInterfaceRepository } from '../data/repository/TaskRepository/TaskInterfaceRepository';
import type { GetAllTasksResponseModel, TaskResponseModel } from '../data/repository/TaskRepository/model/response/GetAllTasksResponseModel';
import type { CreateTaskResponseModel } from '../data/repository/TaskRepository/model/response/CreateTaskResponseModel';

// Instancia del repositorio (mock en desarrollo, http en producción)
const TaskRepository: TaskInterfaceRepository = TaskRepositoryFactory.getInstance();

// Interfaz con todo lo que comparte el contexto
interface TaskContextType {
    tasks: TaskResponseModel[];
    inputValue: string;
    loading: boolean;
    onAddTask: () => void;
    onInputChange: (value: string) => void;
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
    getTaskById: (id: string) => TaskResponseModel | undefined;
}

// Crear el contexto con valor inicial null
const TaskContext = createContext<TaskContextType | null>(null);

// Estado unificado de la vista
interface DashboardState {
    tasks: TaskResponseModel[];
    inputValue: string;
    loading: boolean;
}

// Función inicializadora del estado
const createInitialState = (): DashboardState => ({
    tasks: [],
    inputValue: '',
    loading: true,
});

// Componente Provider: contiene TODA la lógica de negocio y la provee a sus hijos
export const TaskContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<DashboardState>(createInitialState);

    // Cargar las tareas del mock al montar el componente
    useEffect(() => {
        TaskRepository.getAllTasks({})
            .then((response: GetAllTasksResponseModel) => {
                setState(prev => ({ ...prev, tasks: response, loading: false }));
            })
            .catch((error: unknown) => {
                console.error('Error al obtener tareas:', error);
                setState(prev => ({ ...prev, loading: false }));
            });
    }, []);

    // Añadir tarea llamando al mock y luego actualizar el estado
    const handleAddTask = () => {
        if (state.inputValue.trim()) {
            TaskRepository.createTask({ description: state.inputValue.trim() })
                .then((newTask: CreateTaskResponseModel) => {
                    setState(prev => ({
                        ...prev,
                        tasks: [...prev.tasks, newTask],
                        inputValue: '',
                    }));
                })
                .catch((error: unknown) => {
                    console.error('Error al crear tarea:', error);
                });
        }
    };

    // Actualizar el valor del input
    const handleInputChange = (value: string) => {
        setState(prev => ({ ...prev, inputValue: value }));
    };

    // Alternar el estado completado de una tarea (local, no hay endpoint PATCH)
    const handleToggleTask = (id: string) => {
        setState(prev => ({
            ...prev,
            tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t),
        }));
    };

    // Eliminar tarea llamando al mock y luego actualizar el estado
    const handleDeleteTask = (id: string) => {
        TaskRepository.deleteTask({ taskId: id })
            .then(() => {
                setState(prev => ({
                    ...prev,
                    tasks: prev.tasks.filter(t => t.id !== id),
                }));
            })
            .catch((error: unknown) => {
                console.error('Error al eliminar tarea:', error);
            });
    };

    // Buscar una tarea por su id (para la vista de detalle)
    const getTaskById = (id: string): TaskResponseModel | undefined => {
        return state.tasks.find(t => t.id === id);
    };

    const contextValue: TaskContextType = {
        tasks: state.tasks,
        inputValue: state.inputValue,
        loading: state.loading,
        onAddTask: handleAddTask,
        onInputChange: handleInputChange,
        onToggleTask: handleToggleTask,
        onDeleteTask: handleDeleteTask,
        getTaskById,
    };

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
};

// Hook personalizado para consumir el contexto de forma segura
export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext debe usarse dentro de un TaskContextProvider');
    }
    return context;
};