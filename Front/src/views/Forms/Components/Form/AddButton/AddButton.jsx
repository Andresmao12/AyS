import React from 'react'
import './AddButton.css'

export const AddButton = ({ onClick }) => {
    return (
        <div className='container-button'>
            <button className="add-button" onClick={onClick}>
                +
            </button>
        </div>
    )
}
