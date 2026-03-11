// Modelo de dominio para la tarea recién creada
export interface CreateTaskResponseModel {
    id: string;
    description: string;
    completed: boolean;
}
