// Componente reutilizable para las tarjetas de los subtemas de todos los niveles
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Iconos de editar y eliminar

export default function SubtemaCard({
  title,
  description = "", // Valor predeterminado en el parámetro
  link,
  imgSrc,
  buttonColor,
  role,
  onEdit,
  onDelete
}) {
  return (
    <div className="flex md:flex-row flex-col items-center border-gray-200 bg-white shadow-md mx-auto p-6 border rounded-xl w-full max-w-2xl text-center md:text-left transform transition hover:-translate-y-2 duration-300 ease-in-out hover:scale-105">

      {/* Imagen del subtema */}
      <div className="relative flex-shrink-0 mb-4 md:mb-0 rounded-lg w-full md:w-1/3 h-auto max-h-40 md:max-h-60 overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="rounded-lg w-full h-full object-contain"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col justify-between ml-4 w-full">
        <h2 className="mb-2 font-semibold text-2xl text-purple-800 md:text-3xl wonder">{title}</h2>
        <p className="mb-4 text-base text-gray-600 md:text-lg italic yagora">{description}</p>
        <div className="flex md:flex-row flex-col justify-between items-center space-y-4 md:space-y-0 mt-4">
          {/* Botón para explorar el subtema */}
          <Link href={link} className="w-full md:w-auto">
            <button className={`${buttonColor} px-6 py-2 w-full md:w-auto rounded-full text-white text-lg yagora font-semibold transition transform duration-300 hover:-translate-y-1`}>
              Comenzar
            </button>
          </Link>

          {/* Botones de Editar y Eliminar visibles solo para admin */}
          {role === "admin" && (
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button className="bg-blue-500 hover:bg-blue-700 p-2 rounded-full text-white" onClick={onEdit} title="Editar">
                <FiEdit className="text-xl" />
              </button>
              <button className="bg-red-500 hover:bg-red-700 p-2 rounded-full text-white" onClick={onDelete} title="Eliminar">
                <FiTrash2 className="text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

SubtemaCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  role: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
