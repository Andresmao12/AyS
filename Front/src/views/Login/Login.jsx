import styles from './Login.module.css'
import { useNavigate } from "react-router-dom"
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {

    const navigate = useNavigate();
<<<<<<< Updated upstream
=======
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();

        const dataToSend = {
            campoUsuario: "email",
            campoContrasena: "contrasena",
            valorUsuario: email,
            valorContrasena: contrasena,
        }

        const response = await fetch(`${fetchRoute}/api/proyecto/usuario/verificar-contrasena`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            const data = await response.json();

            console.log('DATALOGINTK', data)

            const toLlocalStorage = { email: data.email, rol: data.rol }

            // Guarda los datos del usuario y los roles en localStorage
            localStorage.setItem("usuario", JSON.stringify(toLlocalStorage));
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("token", JSON.stringify(data.token))
            navigate("/formularios");
        } else {
            alert("Usuario o contraseña incorrecta");
        }
    };

>>>>>>> Stashed changes

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