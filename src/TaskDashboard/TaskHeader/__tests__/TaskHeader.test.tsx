import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { TaskHeader } from '../TaskHeader';
import { renderWithContext, mockTasks } from '../../__tests__/testHelper';

describe('TaskHeader', () => {

    it('debería mostrar el título "Gestor de Operaciones"', () => {
        renderWithContext(<TaskHeader />);
        expect(screen.getByText('Gestor de Operaciones')).toBeInTheDocument();
    });

    it('debería mostrar "0 tareas" cuando no hay tareas', () => {
        renderWithContext(<TaskHeader />, { tasks: [] });
        expect(screen.getByText('0 tareas')).toBeInTheDocument();
    });

    it('debería mostrar "1 tarea" en singular cuando hay una sola tarea', () => {
        renderWithContext(<TaskHeader />, { tasks: [mockTasks[0]] });
        expect(screen.getByText('1 tarea')).toBeInTheDocument();
    });

    it('debería mostrar "3 tareas" en plural cuando hay varias tareas', () => {
        renderWithContext(<TaskHeader />, { tasks: mockTasks });
        expect(screen.getByText('3 tareas')).toBeInTheDocument();
    });
});