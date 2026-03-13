import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { TaskInput } from '../TaskInput';
import { renderWithContext } from '../../__tests__/testHelper';

describe('TaskInput', () => {

    it('debería renderizar el campo de texto con el placeholder', () => {
        renderWithContext(<TaskInput />);
        expect(screen.getByPlaceholderText('Añadir nueva tarea...')).toBeInTheDocument();
    });

    it('debería renderizar el botón "Añadir"', () => {
        renderWithContext(<TaskInput />);
        expect(screen.getByText('Añadir')).toBeInTheDocument();
    });

    it('debería mostrar el valor del input que viene del contexto', () => {
        renderWithContext(<TaskInput />, { inputValue: 'Mi tarea' });
        const input = screen.getByPlaceholderText('Añadir nueva tarea...');
        expect(input).toHaveValue('Mi tarea');
    });

    it('debería llamar a onInputChange cuando el usuario escribe', () => {
        const { contextValue } = renderWithContext(<TaskInput />);
        const input = screen.getByPlaceholderText('Añadir nueva tarea...');

        fireEvent.change(input, { target: { value: 'Nueva tarea' } });

        expect(contextValue.onInputChange).toHaveBeenCalledWith('Nueva tarea');
    });

    it('debería llamar a onAddTask cuando se envía el formulario', () => {
        const { contextValue } = renderWithContext(<TaskInput />);
        const form = screen.getByPlaceholderText('Añadir nueva tarea...').closest('form')!;

        fireEvent.submit(form);

        expect(contextValue.onAddTask).toHaveBeenCalled();
    });
});