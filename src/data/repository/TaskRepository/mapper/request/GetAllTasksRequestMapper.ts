import { environment } from '../../../../../env/environment';
import type { GetAllTasksRequestModel } from '../../model/request/GetAllTasksRequestModel';
import type { GetAllTasksRequestDto } from '../../dto/request/GetAllTasksRequestDto';

// Transforma el modelo de dominio al DTO de la request HTTP
export class GetAllTasksRequestMapper {
    static toRequest(_requestModel: GetAllTasksRequestModel): GetAllTasksRequestDto {
        const url = environment.TaskAPI.host + environment.TaskAPI.endpoints.allTasks;
        const headers = {};
        const body = {};

        return { url, headers, body };
    }
}
