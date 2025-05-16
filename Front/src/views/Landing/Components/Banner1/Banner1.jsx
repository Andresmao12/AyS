import React from 'react'
import styles from './Banner1.module.css'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

function Banner1() {

    const navigate = useNavigate();

    return (
        <section className={styles.container}>
            <div className={styles.container_textCont}>
                <h1>Proyecto Aplicaciones y Servicios Web</h1>
                <button className={styles.btnLogin} onClick={() => navigate("/login")} ><span>Start <FaArrowRight className={styles.btnLogin_arrow}/>
                </span></button>

            </div>
            <img src="https://i.ytimg.com/vi/BH8HFkdcjZc/maxresdefault.jpg" alt="" />
        </section>
    )
}

export default Banner1