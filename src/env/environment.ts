const BASE_URL = "https://api.example.com/api/v1";

export const environment = {
    TaskAPI: {
        host: `${BASE_URL}/tasks`,
        endpoints: {
            allTasks: '',
            singleTask: '/:taskId',
            createTask: '',
            deleteTask: '/:taskId',
        }
    }
};
