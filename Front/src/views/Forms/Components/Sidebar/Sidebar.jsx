import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const [rol, setRol] = useState('');

    // Recuperar el rol del usuario desde localStorage
    useEffect(() => {
        const storedRol = localStorage.getItem('rol');
        if (storedRol) {
            setRol(storedRol);
        }
    }, []);

    const permissions = {
        admin: [
            'Indicador',
            'tipo_indicador',
            'reprensentacion_visual',
            'tipo_actor',
            'fuente',
            'unidad_medicion',
            'sentido',
            'frecuencia',
            'representvisualporindicador',
            'responsablesporindicador',
            'actor',
            'fuentes_por_indicador',
            'variablesporindicador',
            'variable',
            'Usuarios'
        ],
        Verificador : ['Indicador', 'fuente', 'unidad_medicion','tipo_indicador',
            'reprensentacion_visual','variable'],
        invitado : ['Indicador', 'fuente', 'unidad_medicion','variable','variablesporindicador'],
        Validador: ['Indicador', 'tipo_indicador', 'fuente','actor'],
        Administrativo: ['Indicador', 'tipo_indicador', 'fuente','fuentes_por_indicador',
            'variablesporindicador','variable']
    };

    const handleCerrarSesion = () => {
        navigate('/');
        window.localStorage.clear();
    };

    const menuItems = permissions[rol] || [];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Opciones</h2>
            </div>
            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <li key={`${item}-${index}`} className="sidebar-menu-item" onClick={() => navigate(`/formularios/${item}`)}>
                        {item}
                    </li>
                ))}
                <li className='sidebar-menu-item exit' onClick={handleCerrarSesion}>
                    Cerrar Sesion
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
