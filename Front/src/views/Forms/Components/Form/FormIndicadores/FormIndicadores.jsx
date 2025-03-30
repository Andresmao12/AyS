import React, { useEffect, useState } from 'react';
import styles from './FormIndicadores.module.css';

import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes.js';
import tableData from "../../../FormsTables.json";

const IndicadorForm = ({ onSubmit, onCancel }) => {

    // Nombres de las entidades relacionadas a la tabla de indicadores
    let tableNameEntities = ['tipoindicador', 'unidadmedicion', 'sentido', 'frecuencia', 'articulo', 'literal', 'numeral', 'paragrafo']

    // Estado en el cual almacenamos los id existentes de cada entidad relacionada
    const [fks, setFks] = useState(() =>
        tableNameEntities.reduce((acc, tableName) => {
            acc[tableName] = [];
            return acc;
        }, {})
    );

    const endpoints = tableData[0]["endpoints"] // Considerar extraer endponts en archivo aparte

    // Datos del indicador seleccionado
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        fkidtipoindicador: '',
        fkidunidadmedicion: '',
        fkidsentido: '',
        fkidfrecuencia: '',
        fkidarticulo: '',
        fkidliteral: '',
        fkidnumeral: '',
        fkidparagrafo: '',
    });

    useEffect(() => {
        console.log("FKSS:", fks)
    }, [fks])


    useEffect(() => {
        const fetchData = async (tableName) => {
            try {
                const endpoint = endpoints["getAll"]
                    .replace('{nombreProyecto}', 'proyecto')
                    .replace('{nombreTabla}', tableName);

                const res = await fetch(`${fetchRoute}${endpoint}`);
                const data = await res.json();

                return { [tableName]: data }; // Retorna un objeto con la clave siendo el nombre de la tabla

            } catch (error) {
                console.error(`Error al cargar ${tableName}:`, error);
                return { [tableName]: [] }; // Si falla, devuelve un array vacío
            }
        };

        let dataEntities = {};

        // hacemos un llamado a fetchData por cada entidad relacionada
        const fetchAllDataSequentially = async () => {

            for (const table of tableNameEntities) {
                const result = await fetchData(table); // Espera cada petición antes de continuar
                Object.assign(dataEntities, result); // Agrega la data obtenida al objeto final
            }

            console.log("Datos obtenidos:", dataEntities);
            return dataEntities
        };

        const setData = async () => {

            const dataObject = await fetchAllDataSequentially();

            let auxFks = { ...fks }
            for (const [key, value] of Object.entries(dataObject)) {
                auxFks[key] = value.map(item => item["id"])
            }

            console.log("AUXXX: ", auxFks)
            setFks(auxFks)
        }

        setData()

    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
    };


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Agregar Indicador</h2>
            <form className={styles.form} onSubmit={handleSubmit}>

                <div className={styles.inputGroup}>
                    <label>Código:</label>
                    <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} className={styles.input} />
                </div>

                <div className={styles.inputGroup}>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={styles.input} />
                </div>

                {
                    // Mapeamos los inputs por cada una de las entidades relacionadas con sus respectivos ids
                    Object.entries(fks).map(([key, value]) => (

                        <div className={styles.inputGroup} key={key}>
                            <label>{key}:</label>
                            <select name="fkidtipoindicador" value={key} onChange={handleChange} className={styles.input}>
                                <option value="">Seleccione...</option>
                                {
                                    //Mapeamos los ids de la respectiva entidad
                                    value.map(item =>
                                        <option key={item} value={item}>{item}</option>
                                    )
                                }
                            </select>
                        </div>

                    ))}


                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.buttonPrimary}>Guardar</button>
                    <button type="reset" className={styles.buttonSecondary} onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default IndicadorForm;