import React from 'react'
import styles from './BannerAbout.module.css'

function BannerAbout() {

    return (
        <section className={styles.container} id='about'>
            {/* <img src="/equipoCorporativo.png" alt="" /> */}
            <img src="https://media.gettyimages.com/id/1212238415/photo/argentina-health-virus-capybaras.jpg?b=1&s=594x594&w=0&k=20&c=HuAxI4kn4TFI551BQbyfQAJprFf8kR1YV9LfjJ33M7o=" alt="equipo corporativo" />
            <div className={styles.container_textCont}>
                <h1>¿Quienes somos?</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem expedita deleniti qui recusandae nostrum quisquam aliquid corporis vel! Qui a reiciendis deserunt praesentium similique facilis voluptate ea harum, eum temporibus.</p>

            </div>
        </section>
    )
}

export default BannerAbout