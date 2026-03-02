export interface Task {
    id: string;
    description: string;
    completed: boolean;
}

export type TaskAction = 
    | { type: 'ADD_TASK'; payload: string }
    | { type: 'TOGGLE_TASK'; payload: string }
    | { type: 'DELETE_TASK'; payload: string };