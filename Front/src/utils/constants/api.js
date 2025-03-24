export const fetchRoute = 'http://localhost:5266'

export const endpoints = {
    "getAll": "/api/{nombreProyecto}/{nombreTabla}",
    "getById": "/api/{nombreProyecto}/{nombreTabla}/{nombreClave}/{valor}",
    "create": "/api/{nombreProyecto}/{nombreTabla}",
    "update": "/api/{nombreProyecto}/{nombreTabla}/{nombreClave}/{valorClave}",
    "delete": "/api/{nombreProyecto}/{nombreTabla}/{nombreClave}/{valorClave}"
}