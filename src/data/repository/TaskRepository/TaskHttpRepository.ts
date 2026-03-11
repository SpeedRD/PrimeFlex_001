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

export class TaskHttpRepository implements TaskInterfaceRepository {

    // GET /api/tasks
    public getAllTasks(request: GetAllTasksRequestModel): Promise<GetAllTasksResponseModel> {
        return new Promise((resolve, reject) => {
            const { url, headers } = GetAllTasksRequestMapper.toRequest(request);

            fetch(url, { method: 'GET', headers: headers as HeadersInit })
                .then(response => response.json())
                .then(data => {
                    try {
                        resolve(GetAllTasksResponseMapper.fromResponse200(data));
                    } catch (error) {
                        reject('Error in mapper: getAllTasks');
                    }
                })
                .catch(error => reject(error));
        });
    }

    // GET /api/tasks/:taskId
    public getSingleTask(request: GetSingleTaskRequestModel): Promise<GetSingleTaskResponseModel> {
        return new Promise((resolve, reject) => {
            const { url, headers } = GetSingleTaskRequestMapper.toRequest(request);

            fetch(url, { method: 'GET', headers: headers as HeadersInit })
                .then(response => response.json())
                .then(data => {
                    try {
                        resolve(GetSingleTaskResponseMapper.fromResponse200(data));
                    } catch (error) {
                        reject('Error in mapper: getSingleTask');
                    }
                })
                .catch(error => reject(error));
        });
    }

    // POST /api/tasks
    public createTask(request: CreateTaskRequestModel): Promise<CreateTaskResponseModel> {
        return new Promise((resolve, reject) => {
            const { url, headers, body } = CreateTaskRequestMapper.toRequest(request);

            fetch(url, {
                method: 'POST',
                headers: headers as HeadersInit,
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(data => {
                    try {
                        resolve(CreateTaskResponseMapper.fromResponse201(data));
                    } catch (error) {
                        reject('Error in mapper: createTask');
                    }
                })
                .catch(error => reject(error));
        });
    }

    // DELETE /api/tasks/:taskId
    public deleteTask(request: DeleteTaskRequestModel): Promise<void> {
        return new Promise((resolve, reject) => {
            const { url, headers } = DeleteTaskRequestMapper.toRequest(request);

            fetch(url, { method: 'DELETE', headers: headers as HeadersInit })
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }
}
