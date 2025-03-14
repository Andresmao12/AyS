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

export const FormsTemplate = () => {

    const { table } = useParams()


    const [showForm, setShowForm] = useState(false);
    const [showSearchInput, setshowSearchInput] = useState(false)
    const [selectedData, setSelectedData] = useState(null);
    const [tableData, setTableData] = useState([]);

    const [schema, setschema] = useState({})
    const [columnsSchema, setcolumnsSchema] = useState([])

    useEffect(() => {
        if (table) {
            const findTableData = formData.find(schema => schema.name == table)
            const columns = findTableData.fields.map((field) => field.name)
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

    const handleSubmit = async (formData) => {
        const endpoint = selectedData
            ? schema.endpoints.update
                .replace('{nombreProyecto}', 'proyecto')
                .replace('{nombreTabla}', schema.table)
                .replace('{nombreClave}', 'id')
                .replace('{valorClave}', selectedData.id)
            : schema.endpoints.create
                .replace('{nombreProyecto}', 'proyecto')
                .replace('{nombreTabla}', schema.table);

        const method = selectedData ? 'PUT' : 'POST';

        try {
            const response = await fetch(`${fetchRoute}${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            setShowForm(false);
        } catch (error) {
            console.error('Error al guardar los datos:', error);
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
                                onConsultar={handleConsultar}
                                initialData={selectedData || {}}
                            />
                        )}

                        {
                            showSearchInput && (
                                <SearchForm
                                    schema={schema}
                                    onSubmit={onSubmit}
                                    onCancel={() => setshowSearchInput(false)}
                                    onConsultar={handleConsultar}
                                    initialData={selectedData || {}}

                                />
                            )
                        }
                        <DataTable data={tableData} columns={columnsSchema} />
                    </>
                )}
            </div>

        </div>
    )
}
