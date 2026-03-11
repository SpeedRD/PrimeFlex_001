// Response body del POST /api/tasks (201)
export interface CreateTaskResponseDto {
    id: string;
    description: string;
    completed: boolean;
}
