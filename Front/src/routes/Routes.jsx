import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "../views/Landing/Landing.jsx";
import Login from "../views/Login/Login.jsx";
import Registro from "../views/Login/Registro.jsx";
import { FormsTemplate } from "../views/Forms/FormsTemplate.jsx";
import { permissions } from "../utils/helpers/constants.js";

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    // Verifica si el usuario está autenticado al cargar la aplicación
    const newUsuario = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(newUsuario)
    setIsAuthenticated(!!newUsuario);

  }, []);


  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/formularios"
        element={
          isAuthenticated ? <FormsTemplate /> : <Login />
        }
      />
      <Route
        path="/formularios/:table"
        element={<ValidateSection location={location} isAuthenticated={isAuthenticated} usuario={usuario} />}
      />
    </Routes>
  );
};

export default Router;

const ValidateSection = ({ location, isAuthenticated, usuario }) => {
  console.log("validatesection: ", location.pathname.split("/")[1], usuario, permissions)

  if (isAuthenticated && !permissions[`${usuario?.rol}`]?.includes(location.pathname.split("/")[2])) {
    return <h2 style={{ placeSelf: "center" }} >Acceso denegado</h2>

  } else if (isAuthenticated) {
    return <FormsTemplate />

  } else if (!isAuthenticated) {
    return <Login />
  }
}