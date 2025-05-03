import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "../views/Landing/Landing.jsx";
import Login from "../views/Login/Login.jsx";
import Registro from "../views/Login/Registro.jsx";
import { FormsTemplate } from "../views/Forms/FormsTemplate.jsx";

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si el usuario está autenticado al cargar la aplicación
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
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
          element={
            isAuthenticated ? <FormsTemplate /> : <Login />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;