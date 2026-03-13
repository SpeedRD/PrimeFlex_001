import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { TaskItem } from '../TaskItem';
import { renderWithContext } from '../../../__tests__/testHelper';
import type { Task } from '../../../Types';

const pendingTask: Task = { id: 'test-id-1', description: 'Tarea pendiente', completed: false };
const completedTask: Task = { id: 'test-id-2', description: 'Tarea completada', completed: true };

describe('TaskItem', () => {

    it('debería mostrar la descripción de la tarea', () => {
        renderWithContext(<TaskItem task={pendingTask} />);
        expect(screen.getByText('Tarea pendiente')).toBeInTheDocument();
    });

    it('debería tener el checkbox desmarcado si la tarea está pendiente', () => {
        renderWithContext(<TaskItem task={pendingTask} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    it('debería tener el checkbox marcado si la tarea está completada', () => {
        renderWithContext(<TaskItem task={completedTask} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('debería llamar a onToggleTask al hacer click en el checkbox', () => {
        const { contextValue } = renderWithContext(<TaskItem task={pendingTask} />);
        const checkbox = screen.getByRole('checkbox');

        fireEvent.click(checkbox);

        expect(contextValue.onToggleTask).toHaveBeenCalledWith('test-id-1');
    });

    it('debería llamar a onDeleteTask al hacer click en el botón eliminar', () => {
        const { contextValue } = renderWithContext(<TaskItem task={pendingTask} />);
        const deleteButton = screen.getByLabelText('Eliminar tarea');

        fireEvent.click(deleteButton);

        expect(contextValue.onDeleteTask).toHaveBeenCalledWith('test-id-1');
    });
});