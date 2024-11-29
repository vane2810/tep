"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

function Volver({ title = "Volver", img = "/img/home/regresar/azul.webp", href = null }) {
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            router.push(href); 
        } else {
            router.back(); 
        }
    };

    return (
        <div className="inline-block mt-6 ml-4 md:ml-6 lg:ml-10 transform transition-transform hover:translate-y-1 active:translate-y-2">
            <button onClick={handleClick} className="focus:outline-none">
                <img
                    src={img}
                    alt={title}
                    title={title}
                    className="w-10 md:w-12 lg:w-14 h-auto"
                />
            </button>
        </div>
    );
}

Volver.propTypes = {
    title: PropTypes.string,
    img: PropTypes.string,
    href: PropTypes.string, // Ruta manual para redirigir (opcional)
};

export default Volver;