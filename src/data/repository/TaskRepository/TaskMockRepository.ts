import { TaskInterfaceRepository } from './TaskInterfaceRepository';
import type { GetAllTasksRequestModel } from './model/request/GetAllTasksRequestModel';
import type { GetSingleTaskRequestModel } from './model/request/GetSingleTaskRequestModel';
import type { CreateTaskRequestModel } from './model/request/CreateTaskRequestModel';
import type { DeleteTaskRequestModel } from './model/request/DeleteTaskRequestModel';
import type { GetAllTasksResponseModel } from './model/response/GetAllTasksResponseModel';
import type { GetSingleTaskResponseModel } from './model/response/GetSingleTaskResponseModel';
import type { CreateTaskResponseModel } from './model/response/CreateTaskResponseModel';

import { GetAllTasksRequestMapper } from './mapper/request/GetAllTasksRequestMapper';
import { GetSingleTaskRequestMapper } from './mapper/request/GetSingleTaskRequestMapper';
import { CreateTaskRequestMapper } from './mapper/request/CreateTaskRequestMapper';
import { DeleteTaskRequestMapper } from './mapper/request/DeleteTaskRequestMapper';
import { GetAllTasksResponseMapper } from './mapper/response/GetAllTasksResponseMapper';
import { GetSingleTaskResponseMapper } from './mapper/response/GetSingleTaskResponseMapper';
import { CreateTaskResponseMapper } from './mapper/response/CreateTaskResponseMapper';

// Simula un delay de red
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class TaskMockRepository implements TaskInterfaceRepository {

    // GET /api/tasks
    public async getAllTasks(request: GetAllTasksRequestModel): Promise<GetAllTasksResponseModel> {
        await sleep(500);
        const { url, headers, body } = GetAllTasksRequestMapper.toRequest(request);
        console.log('MOCK getAllTasks:', { url, headers, body });

        return GetAllTasksResponseMapper.fromResponse200(this._getAllTasks_http_200());
    }

    // GET /api/tasks/:taskId
    public async getSingleTask(request: GetSingleTaskRequestModel): Promise<GetSingleTaskResponseModel> {
        await sleep(500);
        const { url, headers, body } = GetSingleTaskRequestMapper.toRequest(request);
        console.log('MOCK getSingleTask:', { url, headers, body });

        return GetSingleTaskResponseMapper.fromResponse200(this._getSingleTask_http_200());
    }

    // POST /api/tasks
    public async createTask(request: CreateTaskRequestModel): Promise<CreateTaskResponseModel> {
        await sleep(500);
        const { url, headers, body } = CreateTaskRequestMapper.toRequest(request);
        console.log('MOCK createTask:', { url, headers, body });

        return CreateTaskResponseMapper.fromResponse201(this._createTask_http_201(request.description));
    }

    // DELETE /api/tasks/:taskId
    public async deleteTask(request: DeleteTaskRequestModel): Promise<void> {
        await sleep(500);
        const { url, headers, body } = DeleteTaskRequestMapper.toRequest(request);
        console.log('MOCK deleteTask:', { url, headers, body });

        // 204 No Content - no devuelve body
    }

    // ---- Mock data ----

    private _getAllTasks_http_200() {
        return [
            {
                id: 'mock-id-001',
                description: 'Tarea de ejemplo 1',
                completed: false,
            },
            {
                id: 'mock-id-002',
                description: 'Tarea de ejemplo 2',
                completed: true,
            },
        ];
    }

    private _getSingleTask_http_200() {
        return {
            id: 'mock-id-001',
            description: 'Tarea de ejemplo 1',
            completed: false,
        };
    }

    private _createTask_http_201(description: string) {
        return {
            id: crypto.randomUUID(),
            description: description,
            completed: false,
        };
    }
}
