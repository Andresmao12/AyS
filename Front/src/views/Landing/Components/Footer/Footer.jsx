import Styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={Styles.container}>
            <p>&copy; 2025 Proyecto Aplicaciones y Servicios Web</p>
            <nav>
                <a href="#">Inicio</a>
                <a href="#">Sobre Nosotros</a>
                <a href="#">Contacto</a>
            </nav>
        </footer>
    )
}

export default Footer