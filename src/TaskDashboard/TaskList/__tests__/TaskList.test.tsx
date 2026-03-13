import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { TaskList } from '../TaskList';
import { renderWithContext, mockTasks } from '../../__tests__/testHelper';

describe('TaskList', () => {

    it('debería mostrar el mensaje vacío cuando no hay tareas', () => {
        renderWithContext(<TaskList />, { tasks: [] });
        expect(screen.getByText('No hay tareas pendientes.')).toBeInTheDocument();
    });

    it('no debería mostrar el mensaje vacío cuando hay tareas', () => {
        renderWithContext(<TaskList />, { tasks: mockTasks });
        expect(screen.queryByText('No hay tareas pendientes.')).not.toBeInTheDocument();
    });

    it('debería renderizar todas las tareas', () => {
        renderWithContext(<TaskList />, { tasks: mockTasks });
        expect(screen.getByText('Tarea de prueba 1')).toBeInTheDocument();
        expect(screen.getByText('Tarea de prueba 2')).toBeInTheDocument();
        expect(screen.getByText('Tarea de prueba 3')).toBeInTheDocument();
    });
});