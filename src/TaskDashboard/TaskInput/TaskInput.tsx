import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useTaskContext } from '../TaskContext';

// Componente Dummy: consume del contexto en vez de recibir props
export const TaskInput: React.FC = () => {
    const { inputValue, onInputChange, onAddTask } = useTaskContext();

    // Manejar el submit del formulario, prevenir recarga de página
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        onAddTask();
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <IconField iconPosition="left" className="flex-grow-1">
                <InputIcon className="pi pi-check-square" />
                <InputText 
                    value={inputValue} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value)} 
                    placeholder="Añadir nueva tarea..." 
                    className="w-full"
                />
            </IconField>
            {/* type="submit" hace que el botón dispare el onSubmit del form */}
            <Button type="submit" icon="pi pi-plus" label="Añadir" className="p-button-primary" />
        </form>
    );
};