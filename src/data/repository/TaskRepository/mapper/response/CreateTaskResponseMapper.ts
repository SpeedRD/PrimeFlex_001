import type { CreateTaskResponseDto } from '../../dto/response/CreateTaskResponseDto';
import type { CreateTaskResponseModel } from '../../model/response/CreateTaskResponseModel';

// Transforma el DTO de la response HTTP al modelo de dominio
export class CreateTaskResponseMapper {
    static fromResponse201(response: CreateTaskResponseDto): CreateTaskResponseModel {
        return {
            id: response.id,
            description: response.description,
            completed: response.completed,
        };
    }
}
