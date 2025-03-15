import React, { act, useState } from 'react';
import './UpdateModal.css'

const UpdateModal = ({ schema, onUpdate, onClose, actualValues }) => {
    const [formData, setFormData] = useState(actualValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onUpdate(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="dynamic-form-container">
                    <form className="dynamic-form" onSubmit={handleSubmit}>
                        {schema.fields.map((field) => (

                            field.name !== "id" && (
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
                            <button type='button' className="submit-button" onClick={handleSubmit}>Guardar</button>
                            <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;