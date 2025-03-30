import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ userRole = 'admin' }) => {

    const navigate = useNavigate()

    const permissions = {
        admin: ['Indicador', 'tipo_indicador', 'unidad_medicion', 'reprensentacion_visual', 'tipo_actor', 'fuente', 'sentido', 'frecuencia'],
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
                    <>
                        <li key={index} className="sidebar-menu-item" onClick={() => { navigate(`/formularios/${item}`) }} >
                            {item}
                        </li>
                        {/* {(index == 0) && <hr className="slidebar-hr" />} */}
                    </>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;