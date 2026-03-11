import { environment } from '../../../../../env/environment';
import type { CreateTaskRequestModel } from '../../model/request/CreateTaskRequestModel';
import type { CreateTaskRequestDto } from '../../dto/request/CreateTaskRequestDto';

// Transforma el modelo de dominio al DTO de la request HTTP
export class CreateTaskRequestMapper {
    static toRequest(requestModel: CreateTaskRequestModel): CreateTaskRequestDto {
        const url = environment.TaskAPI.host + environment.TaskAPI.endpoints.createTask;
        const headers = { 'Content-Type': 'application/json' };
        const body = { description: requestModel.description };

        return { url, headers, body };
    }
}
