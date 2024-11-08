// components/SectionHeader.js
import React from "react";
import PropTypes from "prop-types";

const TextHeader = ({ titulo, descripcion, imagenSrc }) => {
  return (
    <div className="flex justify-between items-center mb-8 text-center">
      <div className="flex flex-col">
        <h1 className="font-semibold text-3xl text-indigo-800 yagora">{titulo}</h1>
        <p className="text-gray-600 italic yagora">{descripcion}</p>
      </div>
      {imagenSrc && (
        <img
          src={imagenSrc}
          alt="Icono de tema"
          className="ml-6 w-28 h-24 animate-float object-contain"
        />
      )}
    </div>
  );
};

TextHeader.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  imagenSrc: PropTypes.string, // Este prop es opcional
};

export default TextHeader;
