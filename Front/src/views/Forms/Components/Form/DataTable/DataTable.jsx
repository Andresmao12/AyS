import React from 'react'
import './DataTable.css'
import { MdOutlineDelete } from 'react-icons/md'
import { RxUpdate } from 'react-icons/rx'

const DataTable = ({ data, columns, onDelete, onUpdate }) => {

    const deleteRow = (row) => {
        if (onDelete) {
            onDelete(row)
        }
    }

    const updateRow = (row) => {
        if (onUpdate) {
            onUpdate(row)
        }
    }


    const hasIdField = columns.some(field => field === "id");
    console.log(data)

    return (
        <table className="data-table">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                    <th>Eliminar</th>
                    {
                        hasIdField && <th>Actualizar</th>
                    }
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column, index2) => (
                            <td key={index2}>{row[column]}</td>
                        ))}

                        <td>
                            <span>
                                <MdOutlineDelete
                                    size={27}
                                    color='red'
                                    cursor={'pointer'}
                                    onClick={() => { deleteRow(row) }}
                                />
                            </span>
                        </td>

                        {
                            hasIdField && <td>
                                <span>
                                    <RxUpdate
                                        size={27}
                                        color='blue'
                                        cursor={'pointer'}
                                        onClick={() => { updateRow(row) }}
                                    />
                                </span>
                            </td>
                        }

                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DataTable