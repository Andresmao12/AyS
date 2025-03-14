import React from 'react'
import './DataTable.css'
import { MdOutlineDelete } from 'react-icons/md'
import { RxUpdate } from 'react-icons/rx'

export const DataTable = ({ data, columns, onDelete, onUpdate }) => {

    const deleteRow = (row) => {
        if(onDelete){
            onDelete(row)
        }
    }

    const updateRow = (row) => {
        if(onUpdate){
            onUpdate(row)
        }
    }

    return (
        <table className="data-table">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                    <th>Eliminar</th>
                    <th>Actualizar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td key={column}>{row[column]}</td>
                        ))}

                        <td>
                            <span>
                                <MdOutlineDelete
                                    size={27}
                                    color='red'
                                    cursor={'pointer'}
                                    onClick={() => { deleteRow(row)}}
                                />
                            </span>
                        </td>
                        <td>
                            <RxUpdate
                                size={27}
                                color='blue'
                                cursor={'pointer'}
                                onClick={() => { updateRow(row)}}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
