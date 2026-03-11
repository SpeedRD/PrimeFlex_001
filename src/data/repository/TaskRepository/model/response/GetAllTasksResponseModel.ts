// Modelo de dominio para una tarea individual
export interface TaskResponseModel {
    id: string;
    description: string;
    completed: boolean;
}

// El dominio recibe un array de tareas
export type GetAllTasksResponseModel = TaskResponseModel[];
