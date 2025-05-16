import Styles from "./Nav.module.css"
import { IoLogoFlickr } from "react-icons/io";

function Nav() {

    return (
        <nav className={Styles.container}>
            {/* Logo temporal */}

            <button className={Styles.btnLogin} ><IoLogoFlickr color="#fff" /></button>
        </nav>

    )
}

export default Nav