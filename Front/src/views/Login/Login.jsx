import Styles from "./Login.module.css"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate();

    return (
        <main style={{display : "flex", justifyContent : "center", alignItems: "center", height : "100%", width : "100vw"}}>

            <button onClick={() => navigate("/access")}>Access</button>

        </main>
    )

}

export default Login;