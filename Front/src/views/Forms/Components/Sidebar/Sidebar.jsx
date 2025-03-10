import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'

export const Sidebar = ({ userRole = 'admin' }) => {

    const navigate = useNavigate()

    const permissions = {
        admin: ['tipo_indicador', 'unidad_medicion', 'reprensentacion_visual', 'tipo_actor', 'fuente', 'sentido'],
        verificador: [''],
        validador: []
    }

    const menuItems = permissions[userRole] || [];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Opciones</h2>
            </div>
            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <li key={index} className="sidebar-menu-item" onClick={() => { navigate(`/formularios/${item}`) }} >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
