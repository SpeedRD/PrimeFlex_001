import type { GetSingleTaskResponseDto } from '../../dto/response/GetSingleTaskResponseDto';
import type { GetSingleTaskResponseModel } from '../../model/response/GetSingleTaskResponseModel';

// Transforma el DTO de la response HTTP al modelo de dominio
export class GetSingleTaskResponseMapper {
    static fromResponse200(response: GetSingleTaskResponseDto): GetSingleTaskResponseModel {
        return {
            id: response.id,
            description: response.description,
            completed: response.completed,
        };
    }
}
