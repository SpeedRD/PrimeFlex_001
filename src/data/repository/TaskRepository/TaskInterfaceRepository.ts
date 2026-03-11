import type { GetAllTasksRequestModel } from './model/request/GetAllTasksRequestModel';
import type { GetSingleTaskRequestModel } from './model/request/GetSingleTaskRequestModel';
import type { CreateTaskRequestModel } from './model/request/CreateTaskRequestModel';
import type { DeleteTaskRequestModel } from './model/request/DeleteTaskRequestModel';
import type { GetAllTasksResponseModel } from './model/response/GetAllTasksResponseModel';
import type { GetSingleTaskResponseModel } from './model/response/GetSingleTaskResponseModel';
import type { CreateTaskResponseModel } from './model/response/CreateTaskResponseModel';

// Contrato abstracto: define qué métodos deben implementar Http y Mock
export abstract class TaskInterfaceRepository {
    public abstract getAllTasks(request: GetAllTasksRequestModel): Promise<GetAllTasksResponseModel>;
    public abstract getSingleTask(request: GetSingleTaskRequestModel): Promise<GetSingleTaskResponseModel>;
    public abstract createTask(request: CreateTaskRequestModel): Promise<CreateTaskResponseModel>;
    public abstract deleteTask(request: DeleteTaskRequestModel): Promise<void>;
}
