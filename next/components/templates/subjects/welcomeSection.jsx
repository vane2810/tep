// Componente de bienvenida para todos las asignaturas de cada materia
import React from "react";
import PropTypes from "prop-types";

const WelcomeSection = ({ personajeImg, personaje, titulo }) => (
  <section className="mb-4 p-5 rounded-lg w-full">
    <div className="flex md:flex-row flex-col justify-center items-center mb-5">
      <div className="flex flex-col items-center md:mr-8 mb-4 md:mb-0 md:ml-2.5">
        <img
          src={personajeImg}
          alt={personaje}
          className="mx-2 w-32 md:w-auto h-32 md:h-64 planet-animation"
        />
      </div>
      <p className="text-2xl text-center md:text-4xl lg:text-6xl super">{titulo}</p>
    </div>
    <p className="text-center text-lg md:text-2xl lg:text-3xl story">¡Bienvenidos a mi clase, soy el Profesor {personaje} y te guiaré en esta aventura!</p>
  </section>
);

WelcomeSection.propTypes = {
  personajeImg: PropTypes.string.isRequired,
  personaje: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
};

export default WelcomeSection;
