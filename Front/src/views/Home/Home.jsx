import Styles from "./Home.module.css"

import Nav from "./Components/Nav/Nav.jsx";
import Target from "./Components/Target/Target.jsx";
import Slide from "./Components/Slide/Slide.jsx";

const Home = () => {

    return (
        <>
            {/* El nav es temporal */}
            <Nav />
            <div className={Styles.gridContainer}>
                <Target />
                <Target />
                <Target />
                <Target />
                <Target />
                <Target />
            </div>
            Acceso

        </>
    )

}


export default Home;