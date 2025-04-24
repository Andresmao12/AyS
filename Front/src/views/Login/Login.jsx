import styles from './Login.module.css'
import { useNavigate } from "react-router-dom"
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.login}>
            <form action="">
                <h1>Bienvenido</h1>
                <div className={styles.cajatexto}>
                    <input type="text" placeholder="Nombre de usuario" required/>
                    <FaUser className={styles.icon} />
                </div>
                <div className={styles.cajatexto}>
                    <input type="password" placeholder="Contraseña" required></input>
                    <FaLock className={styles.icon} />
                </div>
                <button type="submit" onClick={() => navigate("/formularios")}>Ingresar</button>

                <div className={styles.registrarCuenta}>
                    <span className={styles.RegresarLogin} onClick={() => navigate("/registro")}>
                        ¿No tienes una cuenta? <b>Registrarse</b></span>
                </div>
            </form>
        </div>
    )

}

export default Login;