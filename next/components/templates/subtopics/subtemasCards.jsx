// components/SubtemaCard.js
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function SubtemaCard({ title, description, link, buttonLabel, imgSrc, buttonColor }) {
  return (
    <div className="flex flex-col items-center border-gray-200 bg-white shadow-md hover:shadow-lg mx-auto p-6 border rounded-xl w-full max-w-xs text-center transition-shadow duration-300 ease-in-out">
      <h2 className="mb-4 font-semibold text-2xl text-indigo-800 wonder">{title}</h2>

      {/* Imagen del subtema con efecto de escala suave */}
      <div className="relative mb-4 rounded-lg w-full h-40 overflow-hidden">
        <img src={imgSrc} alt={title} className="w-full h-full transform transition-transform duration-300 object-cover hover:scale-105" />
      </div>

      {/* Descripción del subtema */}
      <p className="mb-4 text-gray-600 text-sm italic">{description}</p>

      {/* Botón para explorar el subtema con color personalizado */}
      <Link href={link}>
        <button className={`${buttonColor} hover:bg-opacity-80 mt-4 px-6 py-2 rounded-full text-white font-semibold shadow-md transition duration-300`}>
          {buttonLabel}
        </button>
      </Link>
    </div>
  );
}

SubtemaCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired, // El color del botón es requerido
};
