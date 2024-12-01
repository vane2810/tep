// Componente de bienvenida para todas las asignaturas de cada materia
import React from "react";
import PropTypes from "prop-types";

const WelcomeSection = ({ personajeImg, personaje, titulo }) => (
  <section className="bg-white shadow-lg my-8 p-4 rounded-lg w-full">
    {/* Contenedor de Bienvenida */}
    <div className="flex md:flex-row flex-col justify-center items-center mb-6">
      {/* Imagen del personaje */}
      <div className="flex flex-col items-center md:mr-8 mb-4 md:mb-0">
        <img
          src={personajeImg}
          alt={`Imagen de ${personaje}`}
          className="w-36 md:w-60 h-36 md:h-64 object-contain"
        />
      </div>
      {/* Título y mensaje adicional */}
      <div className="text-center">
        <p className="mb-6 text-3xl md:text-5xl lg:text-6xl tracking-wide super">{titulo}</p>
        <p className="text-xl md:text-3xl lg:text-2xl italic yagora">¡Bienvenidos a mi clase, soy  {personaje} y te guiaré en esta aventura!</p>
      </div>
    </div>
  </section>
);

WelcomeSection.propTypes = {
  personajeImg: PropTypes.string.isRequired,
  personaje: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
};

export default WelcomeSection;
