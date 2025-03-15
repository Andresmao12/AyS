import React, { useState } from 'react'

export const SearchForm = ({ schema, onCancel, initialData = {}, onConsultar }) => {

    const [formData, setFormData] = useState(initialData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleConsultar = async () => {
        if (onConsultar) {
            onConsultar(formData);
        }
    };


    return (
        <div className="dynamic-form-container">
            <form className="dynamic-form">
                {schema.fields.map((field) => (

                    field.name == "id" && (
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
                    )
                ))}
                <div className="form-actions">
                    <button type="button" className="consultar-button" onClick={handleConsultar}>Consultar</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}
