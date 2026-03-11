// DELETE /api/tasks/:taskId - El taskId va en la URL
export interface DeleteTaskRequestDto {
    url: string;
    headers: Object;
    body: Object;
}
