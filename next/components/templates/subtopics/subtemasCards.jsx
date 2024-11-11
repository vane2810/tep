// Componente reutilizable para las tarjetas de los subtemas de todos los niveles
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function SubtemaCard({ title, description, link, buttonLabel, imgSrc, buttonColor }) {
  return (
    <div className="flex md:flex-row flex-col items-center border-gray-200 bg-white shadow-md mx-auto p-6 border rounded-xl w-full max-w-2xl text-center md:text-left transition-shadow duration-300 ease-in-out">
      
      {/* Imagen del subtema sin efecto de escala */}
      <div className="relative md:mr-4 mb-4 md:mb-0 rounded-lg w-full md:w-1/3 h-40 overflow-hidden">
        <img src={imgSrc} alt={title} className="rounded-lg w-full h-full object-cover" />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col justify-between w-full md:w-2/3">
        <h2 className="mb-2 font-semibold text-2xl text-indigo-800 wonder">{title}</h2>
        
        {/* Descripción del subtema */}
        <p className="mb-4 text-gray-600 text-sm italic">{description}</p>

        {/* Botón para explorar el subtema con efecto de levantamiento */}
        <Link href={link}>
          <button className={`${buttonColor} mt-4 px-6 py-2 rounded-full text-white font-semibold transition transform duration-300 hover:-translate-y-1`}>
            {buttonLabel}
          </button>
        </Link>
      </div>
    </div>
  );
}

SubtemaCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired, 
};
