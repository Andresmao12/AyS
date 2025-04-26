import { useState } from "react";
import { fetchRoute } from '../../utils/helpers/fecthRoutes.js';
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    
const handleLogin = async (e) => {
     e.preventDefault();
    
     const response = await fetch(`${fetchRoute}/api/proyecto/usuario/login`, {
     method: "POST",
     headers: {
     "Content-Type": "application/json"
     },
     body: JSON.stringify({ email, contrasena })
     });
    
     if (response.ok) {
        const data = await response.json();
        // Guarda los datos del usuario y los roles en localStorage
        localStorage.setItem("usuario", JSON.stringify(data));
        localStorage.setItem("rol", data.rol); 
        navigate("/formularios");
        } else {
        alert("Usuario o contraseña incorrecta");
        }
    };
    

    return (
        <div className={styles.login}>
            <form onSubmit={handleLogin}>
                <h1>Bienvenido</h1>
                <div className={styles.cajatexto}>
                    <input
                        type="text"
                        placeholder="Correo electrónico"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaUser className={styles.icon} />
                </div>
                <div className={styles.cajatexto}>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                    <FaLock className={styles.icon} />
                </div>
                <button type="submit">Ingresar</button>
                <div className={styles.registrarCuenta}>
                    <span className={styles.RegresarLogin} onClick={() => navigate("/registro")}>
                        ¿No tienes una cuenta? <b>Registrarse</b>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
