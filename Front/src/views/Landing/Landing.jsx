import styles from "./Landing.module.css"

import Nav from "./Components/Nav/Nav.jsx"
import Banner1 from "./Components/Banner1/Banner1.jsx"
import Footer from "./Components/Footer/Footer.jsx"

const Landing = () => {
  return (
    <>
      <Nav />
      <main className={styles.container}>
        <Banner1 />
      </main>
      <Footer />
    </>
  )
}

export default Landing;