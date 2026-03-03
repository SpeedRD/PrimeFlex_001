import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

interface TaskInputProps {
    inputValue: string;
    onInputChange: (value: string) => void;
    onAddTask: () => void;
}

// Componente Dummy: solo depende de sus props para el formulario de entrada
export const TaskInput: React.FC<TaskInputProps> = ({ inputValue, onInputChange, onAddTask }) => {
    return (
        <div className="flex gap-2">
            <IconField iconPosition="left" className="flex-grow-1">
                <InputIcon className="pi pi-check-square" />
                <InputText 
                    value={inputValue} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value)} 
                    placeholder="Añadir nueva tarea..." 
                    className="w-full"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onAddTask()} 
                />
            </IconField>
            <Button icon="pi pi-plus" label="Añadir" onClick={onAddTask} className="p-button-primary" />
        </div>
    );
};