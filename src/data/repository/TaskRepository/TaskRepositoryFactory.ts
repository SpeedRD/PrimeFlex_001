import { TaskInterfaceRepository } from './TaskInterfaceRepository';
import { TaskHttpRepository } from './TaskHttpRepository';
import { TaskMockRepository } from './TaskMockRepository';

// Factory + Singleton: crea una única instancia del repositorio
// En producción usa el HTTP real, en desarrollo usa el Mock
class TaskRepositoryFactory {
    private static instance: TaskInterfaceRepository | null = null;

    static getInstance(): TaskInterfaceRepository {
        if (!TaskRepositoryFactory.instance) {
            if (import.meta.env.PROD) {
                TaskRepositoryFactory.instance = new TaskHttpRepository();
            } else {
                TaskRepositoryFactory.instance = new TaskMockRepository();
            }
        }
        return TaskRepositoryFactory.instance;
    }
}

export default TaskRepositoryFactory;
