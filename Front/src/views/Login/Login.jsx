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
                <div className={styles.recordar}>
                    <label>
                        <input type="checkbox"/>
                        <a href="#"> Recordar contraseña</a>
                    </label>
                </div>
                <button type="submit" onClick={() => navigate("/formularios")}>Ingresar</button>

                <div className={styles.registrarCuenta}>
                    <p>No tiene una cuenta? <a href="#">Registrarse</a></p>
                </div>
            </form>
        </div>
    )

}

export default Login;