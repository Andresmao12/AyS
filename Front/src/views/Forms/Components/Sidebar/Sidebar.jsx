import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ userRole = 'admin' }) => {

    const navigate = useNavigate()

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
        verificador: [''],
        validador: []
    };

    const handleCerrarSesion = () => {
        navigate('/')
        window.localStorage.clear()
    }

    const menuItems = permissions[userRole] || [];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Opciones</h2>
            </div>


            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <>
                        <li key={`${item}-${index}`} className="sidebar-menu-item" onClick={() => { navigate(`/formularios/${item}`) }} >
                            {item}
                        </li>
                    </>
                ))}

                <li className='sidebar-menu-item exit' onClick={handleCerrarSesion}>
                    Cerrar Sesion
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;