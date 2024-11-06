// components/NivelTemplate.jsx
"use client";
import React, { useState, useEffect } from "react";
import Volver from "@/components/botonVolver";
import Link from "next/link";
import WelcomeMessage from "@/components/templates/levels/welcomeStructure";
import useSession from "@/hooks/useSession";
import PropTypes from "prop-types";

export default function NivelTemplate({ fullText, images, planetName, planetNumber, gameIntroLink, buttonLinks }) {
  const [showWelcome, setShowWelcome] = useState(false);
  const { session } = useSession();

  useEffect(() => {
    if (session && !localStorage.getItem("hasSeenWelcome")) {
      setShowWelcome(true);
    }
  }, [session]);

  const handleWelcomeEnd = () => setShowWelcome(false);

  return showWelcome ? (
    <WelcomeMessage images={images} fullText={fullText} onWelcomeEnd={handleWelcomeEnd} />
  ) : (
    <main
      style={{
        backgroundImage: "url('/img/fondos/lvl1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex flex-col justify-center items-center"
    >
      
      {/* Diseño centrado con imagen en el medio y botones a los lados */}
      <section className="flex justify-center items-center mt-2 p-6 rounded-lg w-full max-w-5xl">
        {/* Botones a la izquierda */}
        <div className="flex flex-col items-center space-y-6 mr-6">
          <Link href={buttonLinks.mate}>
            <img
              src="/img/personajes/donkey/donkeyboton.png"
              alt="Matematica"
              className="hover:shadow-lg rounded-full w-40 md:w-48 lg:w-56 xl:w-64 transform transition-transform hover:scale-105"
            />
          </Link>
          <Link href={buttonLinks.lenguaje}>
            <img
              src="/img/personajes/principe/principeboton.png"
              alt="Lenguaje"
              className="hover:shadow-lg rounded-full w-40 md:w-48 lg:w-56 xl:w-64 transform transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* Imagen central */}
        <div className="flex justify-center items-center mx-6">
          {images.length > 0 && (
            <img src="/img/personajes/niveles/tierran1.png" alt={`Nivel ${planetNumber}`} className="w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 animate-tambaleo" />
          )}
        </div>

        {/* Botones a la derecha */}
        <div className="flex flex-col items-center space-y-6 ml-6">
          <Link href={buttonLinks.sociales}>
            <img
              src="/img/personajes/burbuja/burbujaboton.png"
              alt="Sociales"
              className="hover:shadow-lg rounded-full w-40 md:w-48 lg:w-56 xl:w-64 transform transition-transform hover:scale-105"
            />
          </Link>
          <Link href={buttonLinks.ingles}>
            <img
              src="/img/personajes/griffit/griffitboton.png"
              alt="Ingles"
              className="hover:shadow-lg rounded-full w-40 md:w-48 lg:w-56 xl:w-64 transform transition-transform hover:scale-105"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

NivelTemplate.propTypes = {
  fullText: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  planetName: PropTypes.string.isRequired,
  planetNumber: PropTypes.number.isRequired,
  gameIntroLink: PropTypes.string.isRequired,
  buttonLinks: PropTypes.shape({
    mate: PropTypes.string.isRequired,
    lenguaje: PropTypes.string.isRequired,
    sociales: PropTypes.string.isRequired,
    ingles: PropTypes.string.isRequired,
  }).isRequired,
};
