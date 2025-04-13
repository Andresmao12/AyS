import React, { useEffect, useState } from 'react'
import './Indicadores.css'
import Schemas from '../../../FormsTables.json'
import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes';

const tipos = {
    Responsables: [
        { name: "fkidresponsable", type: "select" }
    ],
    Fuentes: [
        { name: "fkidfuente", type: "select" }
    ],
    RepresentacionVisual: [
        { name: "fkidrepresenvisual", type: "select" }
    ],
    Variables: [
        { name: "fkidvariable", type: "select" },
        { name: "dato", type: "text" }
    ],
    Resultado: [
        { name: "resultado", type: "number" }
    ]
};


export const Indicadores = () => {

    const [showModalCreate, setshowModalCreate] = useState(false)
    const [formData, setFormData] = useState({})
    const [fkOptions, setFkOptions] = useState([])

    useEffect(() => {
        loadFkOptions()
    }, [])

    const handleChangeShowFormCreate = () => {
        setshowModalCreate(!showModalCreate)
    }

    const loadFkOptions = async () => {
        const options = {};

        const optionsAdd = [
            { name: "fkidrepresenvisual", table: "represenvisual" },
            { name: "fkidresponsable", table: "actor" },
            { name: "fkidfuente", table: "fuente" },
            { name: "fkidvariable", table: "variable" },
        ]

        for (const field of Schemas[0].fields) {
            if (field.type === 'fk' && field.fkTable) {
                try {
                    const response = await fetch(`${fetchRoute}/api/proyecto/${field.fkTable}`);
                    const data = await response.json();
                    options[field.name] = data;
                } catch (error) {
                    console.error(`Error cargando opciones para ${field.name}:`, error);
                    options[field.name] = [];
                }
            }
        }

        for (const field of optionsAdd) {
            try {
                const response = await fetch(`${fetchRoute}/api/proyecto/${field.table}`);
                const data = await response.json();
                options[field.name] = data;
            } catch (error) {
                console.error(`Error cargando opciones para ${field.name}:`, error);
                options[field.name] = [];
            }
        }

        setFkOptions(options);
    };

    /* MODAL */

    const fieldsSchema = Schemas[0].fields

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const [modoActual, setModoActual] = useState(null);
    const [inputExtra, setInputExtra] = useState({});
    const [datosAgregados, setDatosAgregados] = useState({
        Responsables: [],
        Fuentes: [],
        RepresentacionVisual: [],
        Variables: [],
        Resultado: []
    });

    const handleInputExtraChange = (e) => {
        const { name, value } = e.target;
        setInputExtra((prev) => ({ ...prev, [name]: value }));
    };

    const handleAgregarDato = () => {
        if (!modoActual) return;

        setDatosAgregados((prev) => ({
            ...prev,
            [modoActual]: [...prev[modoActual], inputExtra]
        }));

        setInputExtra({});
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'string':
                return (
                    <input
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.disabled || false}
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.disabled || false}
                    />
                );
            case 'datetime':
                return (
                    <input
                        type='date'
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                    >

                    </input>

                );
            case 'fk':
                return (
                    <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                    >
                        <option value="">Seleccione una opción</option>
                        {fkOptions[field.name]?.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.nombre || option.descripcion}
                            </option>
                        ))}
                    </select>
                );

            case 'datetime':
                return (
                    <input
                        type="datetime-local"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.disabled || false}
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.disabled || false}
                    />
                );
        }
    };



    return (
        <div>
            {/* HEADER */}
            <header>
                <button onClick={handleChangeShowFormCreate}>Crear Indicador</button>
                <button>Buscar</button>
            </header>


            {
                showModalCreate && (
                    <div className='container-modal'>
                        <div className='close-modal' onClick={handleChangeShowFormCreate}></div>
                        <div className='modal-create'>

                            <h3>INDICADORES</h3>
                            <form className='modal-create-form'>
                                {fieldsSchema.map((field) => (
                                    field.name !== "id" && (
                                        <div className="form-group" key={field.name}>
                                            <label>{field.name}</label>
                                            {renderField(field)}
                                        </div>
                                    )

                                ))}
                            </form>

                            <section>
                                <h4>AGREGAR</h4>
                                <div className="btns-acciones-form">
                                    {Object.keys(tipos).map((tipo) => (
                                        <button type="button" key={tipo} onClick={() => setModoActual(tipo)}>
                                            {tipo}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* 🧩 Formulario condicional para agregar datos extras */}
                            {modoActual && (
                                <div style={{ marginTop: "2rem" }}>
                                    <h4>Agregar a {modoActual}</h4>
                                    {tipos[modoActual].map((campo, index) => (
                                        <div key={index} className='form-group'>
                                            <label>{campo.name}</label>
                                            {
                                                campo.type == "select" ? (
                                                    <select
                                                        name={campo.name}
                                                        value={inputExtra[campo.name] || ''}
                                                        onChange={handleInputExtraChange}
                                                    >
                                                        <option value="">Seleccione una opción</option>
                                                        {fkOptions[campo.name]?.map((option) => (
                                                            <option key={option.id} value={option.id}>
                                                                {option.nombre || option.descripcion}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        name={campo.name}
                                                        value={inputExtra[campo.name] || ""}
                                                        onChange={handleInputExtraChange}
                                                    />
                                                )
                                            }


                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAgregarDato}>
                                        Agregar
                                    </button>
                                </div>
                            )}

                            {/* 🗃 Mostrar tablas de datos agregados */}
                            <div className='tabla-agregados-container'>
                                {Object.entries(datosAgregados).map(([tipo, datos]) =>
                                    datos.length > 0 ? (
                                        <div key={tipo}>
                                            <h5>{tipo} agregados:</h5>
                                            <table border="1" style={{ marginBottom: "1rem" }}>
                                                <thead>
                                                    <tr>
                                                        {Object.keys(datos[0]).map((col) => (
                                                            <th key={col}>{col}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {datos.map((fila, idx) => (
                                                        <tr key={idx}>
                                                            {Object.values(fila).map((val, i) => (
                                                                <td key={i}>{val}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
