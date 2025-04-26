import React, { useState } from 'react';
import styles from './BannerServices.module.css';

import Target from './components/Target/Target';
import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

import { FaPhp, FaReact, FaNode } from "react-icons/fa";

// Tus datos
const services = [
    { Icon: FaPhp, title: "PHP", desc: "Lenguaje para desarrollar backend dinámico." },
    { Icon: FaReact, title: "React", desc: "Framework para construir interfaces modernas." },
    { Icon: FaNode, title: "Node.js", desc: "Entorno de ejecución para JavaScript en el servidor." },
    { Icon: FaPhp, title: "Laravel", desc: "Framework de PHP moderno." },
    { Icon: FaReact, title: "Next.js", desc: "Framework React para apps fullstack." },
    { Icon: FaNode, title: "Express", desc: "Framework backend minimalista para Node.js." }
];

function BannerServices() {
    const [current, setCurrent] = useState(0);

    const prev = () => {
        setCurrent(prev => (prev - 1 + services.length) % services.length);
    };

    const next = () => {
        setCurrent(prev => (prev + 1) % services.length);
    };

    const visibleCards = services.slice(current, current + 3);

    // Si estamos al final, volvemos a empezar las tarjetas visibles
    const cardsToShow = visibleCards.length < 3
        ? [...visibleCards, ...services.slice(0, 3 - visibleCards.length)]
        : visibleCards;

    return (
        <section className={styles.container}>
            <h2>Servicios</h2>
            <div className={styles.content}>
                <MdOutlineKeyboardDoubleArrowLeft className={styles.arrow} onClick={prev} />
                <div className={styles.cardCont}>
                        {cardsToShow.map((service, index) => (
                            <Target
                                key={index}
                                Icon={service.Icon}
                                title={service.title}
                                desc={service.desc}
                            />
                        ))}
                </div>
                <MdKeyboardDoubleArrowRight className={styles.arrow} onClick={next} />
            </div>
        </section>
    );
}

export default BannerServices;