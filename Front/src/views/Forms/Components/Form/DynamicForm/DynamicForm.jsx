import React, { useState } from 'react';
import './DynamicForm.css';
import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes';

export const DynamicForm = ({ schema, onSubmit, onCancel, initialData = {}, onConsultar }) => {

    const [formData, setFormData] = useState(initialData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = schema.endpoints.create.replace('{nombreProyecto}', 'proyecto').replace('{nombreTabla}', schema.table);
            const response = await fetch(`${fetchRoute}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status == 200) {
                onSubmit(formData.nombre);
            }

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    const handleConsultar = async () => {
        if (onConsultar) {
            onConsultar(formData);
        }
    };

    return (
        <div className="dynamic-form-container">
            <form className="dynamic-form" onSubmit={handleSubmit}>
                {schema.fields.map((field) => (
                    <div className="form-group" key={field.name}>
                        <label>{field.name}</label>
                        {field.type === 'string' && (
                            <input
                                type="text"
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                required={field.required}
                                disabled={field.disabled ? field.disabled : false}
                            />
                        )}
                        {field.type === 'number' && (
                            <input
                                type="number"
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                required={field.required}
                                disabled={field.disabled ? field.disabled : false}
                            />
                        )}
                    </div>
                ))}
                <div className="form-actions">
                    <button type="submit" className="submit-button">Guardar</button>
                    <button type="button" className="consultar-button" onClick={handleConsultar}>Consultar</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};
