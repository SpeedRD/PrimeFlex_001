import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { TaskContext } from '../TaskContext';
import type { Task } from '../Types';

// Valores por defecto del contexto para los tests
const defaultContextValue = {
    tasks: [] as Task[],
    inputValue: '',
    loading: false,
    onAddTask: vi.fn(),
    onInputChange: vi.fn(),
    onToggleTask: vi.fn(),
    onDeleteTask: vi.fn(),
    getTaskById: vi.fn(),
};

// Helper: renderiza un componente envuelto en el TaskContext con valores personalizables
export const renderWithContext = (
    ui: React.ReactElement,
    contextOverrides: Partial<typeof defaultContextValue> = {}
) => {
    const contextValue = { ...defaultContextValue, ...contextOverrides };

    return {
        ...render(
            <MemoryRouter>
                <TaskContext.Provider value={contextValue}>
                    {ui}
                </TaskContext.Provider>
            </MemoryRouter>
        ),
        contextValue,
    };
};

// Tareas de ejemplo para los tests
export const mockTasks: Task[] = [
    { id: 'test-id-1', description: 'Tarea de prueba 1', completed: false },
    { id: 'test-id-2', description: 'Tarea de prueba 2', completed: true },
    { id: 'test-id-3', description: 'Tarea de prueba 3', completed: false },
];