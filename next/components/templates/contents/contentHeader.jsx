// components/elements/SubtemaContent.js
import React from "react";
import PropTypes from "prop-types";

const ContentHeader = ({ title, imgSrc }) => {
  return (
    <div className="flex justify-center items-center bg-white shadow-lg mx-auto my-8 mt-8 p-6 rounded-2xl max-w-4xl">
      {/* Imagen del subtema a la izquierda */}
      <div className="flex justify-center items-center w-1/3">
        <img
          src={imgSrc || "/img/personajes/starly/starly2.png"} // Imagen predeterminada si no hay ninguna
          alt={title}
          className="rounded-lg w-full max-w-xs h-auto object-cover"
        />
      </div>

      {/* Contenido a la derecha */}
      <div className="flex justify-center items-center ml-6 w-2/3">
        <h1 className="font-bold text-4xl text-center text-purple-800 wonder">Bienvenidos a {title}</h1>
      </div>
    </div>
  );
};

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
};

export default ContentHeader;
