import React from 'react'
import ReactPlayer from "react-player";
import styles from './BannerVideo.module.css'

function BannerVideo() {

    return (
        <section className={styles.container}>
            <div className={styles.textCont}>
                <h1>Como iniciar</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem expedita deleniti qui recusandae nostrum quisquam aliquid corporis vel! Qui a reiciendis deserunt praesentium similique facilis voluptate ea harum, eum temporibus.</p>
            </div>
            <div className={styles.videoCont}>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    controls
                    width="100%"
                    height="100%"
                    className={styles.video}
                />
                <img src="https://i.imgur.com/h7Z78Bq.png" alt="" />
            </div>

        </section>
    )
}

export default BannerVideo
