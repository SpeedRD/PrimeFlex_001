import type { TaskResponseDto } from '../../dto/response/GetAllTasksResponseDto';
import type { GetAllTasksResponseModel, TaskResponseModel } from '../../model/response/GetAllTasksResponseModel';

// Transforma el DTO de la response HTTP al modelo de dominio
export class GetAllTasksResponseMapper {
    static fromResponse200(response: TaskResponseDto[]): GetAllTasksResponseModel {
        return response.map(task => TaskResponseMapper.fromDto(task));
    }
}

// Mapper auxiliar para una tarea individual
class TaskResponseMapper {
    static fromDto(dto: TaskResponseDto): TaskResponseModel {
        return {
            id: dto.id,
            description: dto.description,
            completed: dto.completed,
        };
    }
}
