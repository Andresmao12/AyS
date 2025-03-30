import React, { useEffect, useState } from 'react';
import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes.js';
import styles from './FormIndicadores.module.css';

const IndicadorForm = ({ onSubmit, onCancel }) => {
    const [tiposIndicador, setTiposIndicador] = useState([]);
    const [unidadesMedicion, setUnidadesMedicion] = useState([]);
    const [sentidos, setSentidos] = useState([]);
    const [frecuencias, setFrecuencias] = useState([]);
    const [literales, setLiterales] = useState([]);
    const [numerales, setNumerales] = useState([]);
    const [paragrafos, setParagrafos] = useState([]);

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        fkidtipoindicador: '',
        fkidunidadmedicion: '',
        fkidsentido: '',
        fkidfrecuencia: '',
        fkidliteral: '',
        fkidnumeral: '',
        fkidparagrafo: '',
    });

    useEffect(() => {
        const fetchData = async (endpoint, setState) => {
            try {
                const res = await fetch(`${fetchRoute}${endpoint}`);
                const data = await res.json();
                setState(data);
            } catch (error) {
                console.error(`Error al cargar ${endpoint}:`, error);
            }
        };

        fetchData('/api/tipoindicador', setTiposIndicador);
        fetchData('/api/unidadmedicion', setUnidadesMedicion);
        fetchData('/api/sentido', setSentidos);
        fetchData('/api/frecuencia', setFrecuencias);
        fetchData('/api/literal', setLiterales);
        fetchData('/api/numeral', setNumerales);
        fetchData('/api/paragrafo', setParagrafos);
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

                <div className={styles.inputGroup}>
                    <label>Tipo de Indicador:</label>
                    <select name="fkidtipoindicador" value={formData.fkidtipoindicador} onChange={handleChange} className={styles.input}>
                        <option value="">Seleccione...</option>
                        {tiposIndicador.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Unidad de Medición:</label>
                    <select name="fkidunidadmedicion" value={formData.fkidunidadmedicion} onChange={handleChange} className={styles.input}>
                        <option value="">Seleccione...</option>
                        {unidadesMedicion.map(unidad => (
                            <option key={unidad.id} value={unidad.id}>{unidad.descripcion}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Sentido:</label>
                    <select name="fkidsentido" value={formData.fkidsentido} onChange={handleChange} className={styles.input}>
                        <option value="">Seleccione...</option>
                        {sentidos.map(sentido => (
                            <option key={sentido.id} value={sentido.id}>{sentido.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Frecuencia:</label>
                    <select name="fkidfrecuencia" value={formData.fkidfrecuencia} onChange={handleChange} className={styles.input}>
                        <option value="">Seleccione...</option>
                        {frecuencias.map(frecuencia => (
                            <option key={frecuencia.id} value={frecuencia.id}>{frecuencia.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Literal:</label>
                    <select name="fkidliteral" value={formData.fkidliteral} onChange={handleChange} className={styles.input}>
                        <option value="">Seleccione...</option>
                        {literales.map(literal => (
                            <option key={literal.id} value={literal.id}>{literal.descripcion}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Numeral:</label>
                    <select name="fkidnumeral" value={formData.fkidnumeral} onChange={handleChange} className={styles.input}>
                        <option value="">Seleccione...</option>
                        {numerales.map(numeral => (
                            <option key={numeral.id} value={numeral.id}>{numeral.descripcion}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Parágrafo:</label>
                    <select name="fkidparagrafo" value={formData.fkidparagrafo} onChange={handleChange} className={styles.input}>
                        <option value="">Seleccione...</option>
                        {paragrafos.map(paragrafo => (
                            <option key={paragrafo.id} value={paragrafo.id}>{paragrafo.descripcion}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.buttonPrimary}>Guardar</button>
                    <button type="reset" className={styles.buttonSecondary} onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default IndicadorForm;