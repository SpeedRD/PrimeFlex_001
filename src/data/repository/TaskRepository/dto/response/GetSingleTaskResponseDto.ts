// Response body del GET /api/tasks/:taskId (200)
export interface GetSingleTaskResponseDto {
    id: string;
    description: string;
    completed: boolean;
}
