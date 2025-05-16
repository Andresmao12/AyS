import styles from "./Landing.module.css"

import Nav from "./Components/Nav/Nav.jsx"
import BannerPpal from "./Components/BannerPpal/BannerPpal.jsx"
import BannerAbout from "./Components/BannerAbout/BannerAbout.jsx"
import BannerServices from "./Components/BannerServices/BannerServices.jsx"
import BannerMember from "./Components/BannerMember/BannerMember.jsx"
import BannerVideo from "./Components/BannerVideo/BannerVideo.jsx"
import BannerContact from "./Components/BannerContact/BannerContact.jsx"
import Footer from "./Components/Footer/Footer.jsx"

const Landing = () => {

  let descriptionTemp = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eum corrupti architecto rerum at, cupiditate, minus minima, id ipsum voluptates tempore eius reiciendis. Illum labore voluptatem soluta cumque veniam voluptatum!'

  return (
    <>
      <Nav />
      <main className={styles.container}>
        <BannerPpal />
        <BannerAbout />
        <BannerServices />
        <h1 className={styles.membersTitle}>Integrantes</h1>
        <BannerMember name='Vanessa Espinosa' description={descriptionTemp} />
        <BannerMember name='Andres David Orozco' description={descriptionTemp} direction='right' />
        <BannerMember name='Andres Agudelo Elorza' description={descriptionTemp} />
        <BannerVideo />
        <BannerContact />
      </main>
      <Footer />
    </>
  )
}

export default Landing;


/* Mostrar una página de inicio, con encabezado, cuerpo y pie. La página de inicio debe mostrar un menú donde cada opción permita mostrar información corporativa de su empresa (una empresa de tecnología, hipotética creada por usted): quienes somos, servicios y / productos que se ofrecen, estructura organizacional, integrantes con nombre, función dentro de la empresa e email entre otros, debe mostrar logos e imágenes. Debe mostrar al menos un video elaborado por ustedes, donde se presenten todos los integrantes, se presenta la empresa y un tutorial de cómo funciona el sistema de gestión de indicadores. adicionalmente, la página de inicio debe tener una opción muy visible, para inicio de sesión con usuario y contraseña.   */ 