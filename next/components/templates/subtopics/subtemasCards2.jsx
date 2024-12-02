// Componente reutilizable para las tarjetas de los subtemas de todos los niveles
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function SubtemaCard({ title, description, link, imgSrc, buttonColor }) {
    return (
        <div className="flex flex-col items-center bg-white shadow-md hover:shadow-xl p-6 rounded-lg transform transition hover:-translate-y-2 duration-300 ease-in-out hover:scale-105">

            <h2 className="mb-2 font-semibold text-3xl text-indigo-800 wonder">{title}</h2>

            {/* Descripción del subtema */}
            {description && (
                <p className="mb-4 text-gray-600 text-sm italic yagora">{description}</p>
            )}

            {/* Imagen del subtema con borde */}
            <img src={imgSrc} alt={title} className="shadow-lg mb-4 rounded-lg w-full h-40 object-cover" />

            {/* Botón para explorar el subtema con efecto de levantamiento */}
            <Link href={link}>
                <button className={`${buttonColor} mt-4 px-10 py-2 rounded-full text-white font-semibold transition transform duration-300 hover:-translate-y-1 text-lg`}>
                    Explorar
                </button>
            </Link>
        </div>
    );
}

SubtemaCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string, // Hacemos que la descripción sea opcional
    link: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    buttonColor: PropTypes.string.isRequired,
};

// Valor predeterminado para `description` si no se pasa en la página
SubtemaCard.defaultProps = {
    description: "", 
};