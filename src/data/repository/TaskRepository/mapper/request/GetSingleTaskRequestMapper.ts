import { environment } from '../../../../../env/environment';
import type { GetSingleTaskRequestModel } from '../../model/request/GetSingleTaskRequestModel';
import type { GetSingleTaskRequestDto } from '../../dto/request/GetSingleTaskRequestDto';

// Transforma el modelo de dominio al DTO de la request HTTP
export class GetSingleTaskRequestMapper {
    static toRequest(requestModel: GetSingleTaskRequestModel): GetSingleTaskRequestDto {
        const url = environment.TaskAPI.host +
            environment.TaskAPI.endpoints.singleTask.replace(':taskId', requestModel.taskId);
        const headers = {};
        const body = {};

        return { url, headers, body };
    }
}
