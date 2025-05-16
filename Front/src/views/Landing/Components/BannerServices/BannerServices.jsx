import React, { useState } from 'react';
import styles from './BannerServices.module.css';

import Target from './components/Target/Target';

import { FaPhp, FaReact, FaNode } from "react-icons/fa";

const services = [
    { Icon: FaPhp, title: "PHP", desc: "Lenguaje para desarrollar backend dinámico." },
    { Icon: FaReact, title: "React", desc: "Framework para construir interfaces modernas." },
    { Icon: FaNode, title: "Node.js", desc: "Entorno de ejecución para JavaScript en el servidor." },
    { Icon: FaPhp, title: "Laravel", desc: "Framework de PHP moderno." },
    { Icon: FaReact, title: "Next.js", desc: "Framework React para apps fullstack." },
    { Icon: FaNode, title: "Express", desc: "Framework backend minimalista para Node.js." },
    { Icon: FaNode, title: "Express", desc: "Framework backend minimalista para Node.js." },
    { Icon: FaNode, title: "Express", desc: "Framework backend minimalista para Node.js." }
];

function BannerServices() {

    return (
        <section className={styles.container}>
            <h2>Servicios</h2>
            <div className={styles.gridCont}>
                {services.map((service, index) => (
                    <Target
                        key={index}
                        Icon={service.Icon}
                        title={service.title}
                        desc={service.desc}
                    />
                ))}
            </div>
        </section>
    );
}

export default BannerServices;