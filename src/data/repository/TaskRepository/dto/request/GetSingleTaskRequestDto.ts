// GET /api/tasks/:taskId - El taskId va en la URL
export interface GetSingleTaskRequestDto {
    url: string;
    headers: Object;
    body: Object;
}
