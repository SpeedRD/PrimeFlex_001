// Response body del GET /api/tasks (200)
export interface TaskResponseDto {
    id: string;
    description: string;
    completed: boolean;
}

// El backend devuelve un array
export type GetAllTasksResponseDto = TaskResponseDto[];
