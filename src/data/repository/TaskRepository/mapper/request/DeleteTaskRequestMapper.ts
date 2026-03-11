import { environment } from '../../../../../env/environment';
import type { DeleteTaskRequestModel } from '../../model/request/DeleteTaskRequestModel';
import type { DeleteTaskRequestDto } from '../../dto/request/DeleteTaskRequestDto';

// Transforma el modelo de dominio al DTO de la request HTTP
export class DeleteTaskRequestMapper {
    static toRequest(requestModel: DeleteTaskRequestModel): DeleteTaskRequestDto {
        const url = environment.TaskAPI.host +
            environment.TaskAPI.endpoints.deleteTask.replace(':taskId', requestModel.taskId);
        const headers = {};
        const body = {};

        return { url, headers, body };
    }
}
