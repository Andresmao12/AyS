import React, { useEffect, useState } from 'react'
import { Sidebar } from './Components/Sidebar/Sidebar'
import { useParams } from 'react-router-dom'
import formData from './FormsTables.json'
import { DynamicForm } from './Components/Form/DynamicForm/DynamicForm'
import './FormsTemplate.css'
import { AddButton } from './Components/Form/AddButton/AddButton'
import { DataTable } from './Components/Form/DataTable/DataTable'
import { fetchRoute } from '../../utils/helpers/fecthRoutes'
import SearchButton from './Components/Form/SearchButton/SearchButton'
import { SearchForm } from './Components/Form/SearchForm/SearchForm'
import UpdateModal from './Components/Form/UpdateModal/UpdateModal'

export const FormsTemplate = () => {

    const { table } = useParams()


    const [showForm, setShowForm] = useState(false);
    const [showSearchInput, setshowSearchInput] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const [selectedData, setSelectedData] = useState(null);
    const [tableData, setTableData] = useState([]);

    const [actualUpdateValues, setactualUpdateValues] = useState({})

    const [schema, setschema] = useState({})
    const [columnsSchema, setcolumnsSchema] = useState([])
    const [primaryKey, setprimaryKey] = useState('')

    useEffect(() => {
        if (table) {
            const findTableData = formData.find(schema => schema.name == table)
            const columns = findTableData.fields.map((field) => field.name)
            const primaryKey = findTableData.fields.find(field => field.primaryKey === true).name

            setprimaryKey(primaryKey)
            setcolumnsSchema(columns)
            consultarTodas(findTableData)
            setschema(findTableData)
        }
    }, [table])


    const handleAdd = () => {
        setSelectedData(null);
        setShowForm(!showForm);
    };

    const handleSearch = () => {
        setshowSearchInput(!showSearchInput)
    }

    const handleConsultar = async (formData) => {
        try {
            const endpoint = schema.endpoints.getById
                .replace('{nombreProyecto}', 'proyecto')
                .replace('{nombreTabla}', schema.table)
                .replace('{nombreClave}', 'id')
                .replace('{valor}', formData.id);
            const response = await fetch(`${fetchRoute}${endpoint}`);
            const result = await response.json();
            setTableData(result); // Mostrar el resultado en la tabla
        } catch (error) {
            console.error('Error al consultar:', error);
            consultarTodas(schema)
        }
    };

    const consultarTodas = async (schema) => {
        try {
            const endpoint = schema.endpoints.getAll
                .replace('{nombreProyecto}', 'proyecto')
                .replace('{nombreTabla}', schema.table)
            const response = await fetch(`${fetchRoute}${endpoint}`);
            const result = await response.json();
            setTableData(result); // Mostrar el resultado en la tabla
        } catch (error) {
            console.error('Error al consultar:', error);
        }
    }

    const onSubmit = async (nuevaEntrada) => {
        setTableData([...tableData, nuevaEntrada])
    }

    const handleDelete = async (row) => {
        const value = row[primaryKey]

        const endpoint = schema.endpoints.delete
            .replace('{nombreProyecto}', 'proyecto')
            .replace('{nombreTabla}', schema.table)
            .replace('{nombreClave}', primaryKey)
            .replace('{valorClave}', value);

        try {
            const response = await fetch(`${fetchRoute}${endpoint}`, {
                method: 'Delete',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setTableData((prevData) =>
                    prevData.filter((row) => row.id !== value)
                );
                alert("Eliminado con exito")
            } else {
                alert(response)
            }

        } catch (error) {
            console.error(error)
            alert('Ha ocurrido un error')
        }


    }

    const handleChangeViewUpdateModal = (row) => {
        setactualUpdateValues(row)
        setShowUpdateModal(true)
    }

    const onUpdate = async (updatedData) => {
        const changedFields = {};
        for (const key in updatedData) {
            if (updatedData[key] !== actualUpdateValues[key]) {
                changedFields[key] = updatedData[key];
            }
        }

        if (Object.keys(changedFields).length === 0) {
            console.log('No hay cambios para actualizar');
            return;
        }


        try {
            const endpoint = schema.endpoints.update
                .replace('{nombreProyecto}', 'Proyecto')
                .replace('{nombreTabla}', schema.table)
                .replace('{nombreClave}', primaryKey)
                .replace('{valorClave}', actualUpdateValues.id);


            const response = await fetch(`${fetchRoute}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changedFields),
            });

            if (response.ok) {
                setTableData((prevData) =>
                    prevData.map((row) =>
                        row.id === updatedData.id ? { ...row, ...changedFields } : row
                    )
                );
            } else {
                console.error('Error al actualizar el registro');
            }
        } catch (error) {
            console.error(error)
            alert("Ha ocurrido un problema al actualizar")
        }
    }

    return (
        <div className='app'>
            <Sidebar />

            <div className="content">
                {Object.keys(schema).length !== 0 && (
                    <>
                        <div className='flex-row-end'>
                            <SearchButton onClick={handleSearch} />
                            <AddButton onClick={handleAdd} />
                        </div>

                        {showForm && (
                            <DynamicForm
                                schema={schema}
                                onSubmit={onSubmit}
                                onCancel={() => setShowForm(false)}
                                initialData={selectedData || {}}
                            />
                        )}

                        {
                            showSearchInput && (
                                <SearchForm
                                    schema={schema}
                                    onCancel={() => setshowSearchInput(false)}
                                    onConsultar={handleConsultar}
                                    initialData={selectedData || {}}

                                />
                            )
                        }
                        <DataTable data={tableData} columns={columnsSchema} onDelete={handleDelete} onUpdate={handleChangeViewUpdateModal} />

                        {showUpdateModal && (
                            <UpdateModal
                                schema={schema}
                                onUpdate={onUpdate}
                                onClose={() => setShowUpdateModal(false)}
                                actualValues={actualUpdateValues}
                            />
                        )}
                    </>
                )}
            </div>

        </div>
    )
}
