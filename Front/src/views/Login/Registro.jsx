import styles from './Registro.module.css';
import { fetchRoute } from '../../utils/helpers/fecthRoutes.js';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const Registro = () => {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        confirmPassword: ""
    });
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        
        // Limpiar mensajes de error cuando el usuario empieza a escribir
        if (error) setError("");
    };

    const validateForm = () => {
        // Validación básica del formulario
        if (!formData.userName.trim()) {
            setError("El nombre de usuario es obligatorio");
            return false;
        }
        
        if (formData.userName.length < 3) {
            setError("El nombre de usuario debe tener al menos 3 caracteres");
            return false;
        }
        
        if (!formData.password) {
            setError("La contraseña es obligatoria");
            return false;
        }
        
        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return false;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return false;
        }
        
       
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Datos a enviar (sin el campo confirmPassword)
        const dataToSend = {
            email: formData.userName,
            contrasena: formData.password
        };
        
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${fetchRoute}/api/api/usuario/usuario`, {
                method: "POST",
                body: JSON.stringify(dataToSend),
                headers: { "Content-Type": "application/json" }
            });
            
            const resData = await response.json();
            console.log("Respuesta del servidor:", resData);
            
            if (!response.ok) {
                throw new Error(resData.mensaje || `Error (${response.status}): No se pudo registrar el usuario`);
            }
            
            alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
            navigate("/login");
        } catch (error) {
            console.error("Error completo: ", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <h1>Registro de Usuario</h1>
                
                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}
                
                <div className={styles.cajatexto}>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Ingrese su correo"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        minLength={3}
                    />
                    <MdEmail className={styles.icon} />
                </div>

                <div className={styles.cajatexto}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                    <FaLock className={styles.icon} />
                </div>
                
                <div className={styles.cajatexto}>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <FaLock className={styles.icon} />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className={loading ? styles.buttonLoading : ''}
                >
                    {loading ? "Registrando..." : "Registrar"}
                </button>

                <div className={styles.registrarCuenta}>
                    <span className={styles.RegresarLogin} onClick={() => navigate("/login")}>
                        ¿Ya tienes una cuenta? <b>Login</b>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Registro;