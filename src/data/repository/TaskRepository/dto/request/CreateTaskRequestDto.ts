// POST /api/tasks - Envía description en el body
export interface CreateTaskRequestDto {
    url: string;
    headers: Object;
    body: {
        description: string;
    };
}
