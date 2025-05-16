import React from 'react'
import './AddButton.css'

const AddButton = ({ onClick }) => {
    return (
        <div className='container-button'>
            <button className="add-button" onClick={onClick}>
                +
            </button>
        </div>
    )
}

export default AddButton