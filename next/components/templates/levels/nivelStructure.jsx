// components/NivelTemplate.jsx
"use client";
import React, { useState, useEffect } from "react";
import Volver from "@/components/elements/botonVolver";
import Link from "next/link";
import WelcomeMessage from "@/components/templates/levels/welcomeStructure";
import useSession from "@/hooks/useSession";
import PropTypes from "prop-types";

// Subcomponente para un botón individual con imagen y texto personalizado
function ButtonLink({ href, label, imgSrc, alt }) {
  return (
    <div className="flex flex-col items-center">
      <Link href={href}>
        {/* Contenedor externo con el color principal como borde */}
        <div className="rounded-full celeste w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center hover:shadow-lg transition-transform transform hover:scale-105 mb-2">
          {/* Contenedor interno con fondo blanco */}
          <button className="bg-white rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center overflow-hidden">
            {/* Imagen centrada dentro del círculo blanco */}
            <img
              src={imgSrc}
              alt={alt}
              className="w-2/3 h-2/3 object-contain"
            />
          </button>
        </div>
      </Link>
      {/* Texto debajo del botón con color y fuente personalizada */}
      <span className="text-lg md:text-xl font-semibold text-center text-black mt-1" style={{ fontFamily: 'wonder' }}>
        {label}
      </span>
    </div>
  );
}

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default function NivelTemplate({
  fullText,
  images,
  planetName,
  planetNumber,
  buttonLinks,
  planetImg,
  fondoImg,
}) {
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
        backgroundImage: `url(${fondoImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex flex-col justify-center items-center"
    >
      <section className="relative flex flex-col items-center bg-white bg-opacity-90 mt-6 mb-2 p-4 rounded-full w-full max-w-3xl text-center">
        {!session && (
          <div className="top-4 md:top-6 left-4 md:left-6 absolute">
            <Volver href="/" title="Volver a la página de inicio" />
          </div>
        )}

        <div className="flex flex-col justify-center items-center mt-8 md:mt-0 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-wider super">¡Bienvenido al Nivel {planetNumber}!</h2>
          <p className="mt-2 text-xl sm:text-2xl md:text-3xl wonder">PLANETA {planetName}</p>
        </div>
      </section>

      <section className="flex md:flex-row flex-col justify-center items-center space-y-6 md:space-y-0 mt-2 p-6 rounded-lg w-full max-w-5xl">
        <div className="flex flex-col items-center space-y-6 md:space-y-6 md:mr-6">
          <ButtonLink href={buttonLinks.mate} label="Matemáticas" imgSrc="/img/personajes/donkey/donkey.png" alt="Matemática" />
          <ButtonLink href={buttonLinks.lenguaje} label="Lenguaje" imgSrc="/img/personajes/principe/principe.png" alt="Lenguaje" />
        </div>

        <div className="flex justify-center items-center mx-6">
          <img
            src={planetImg}
            alt={`Nivel ${planetNumber}`}
            className="w-48 md:w-64 lg:w-80 animate-float"
          />
        </div>

        <div className="flex flex-col items-center space-y-6 md:space-y-6 md:ml-6">
          <ButtonLink href={buttonLinks.sociales} label="Sociales" imgSrc="/img/personajes/burbuja/burbujapng.png" alt="Sociales" />
          <ButtonLink href={buttonLinks.ingles} label="Inglés" imgSrc="/img/personajes/griffit/griffit.png" alt="Inglés" />
        </div>
      </section>
    </main>
  );
}

NivelTemplate.propTypes = {
  fondoImg: PropTypes.string.isRequired,
  fullText: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  planetImg: PropTypes.string.isRequired,
  planetName: PropTypes.string.isRequired,
  planetNumber: PropTypes.number.isRequired,
  buttonLinks: PropTypes.shape({
    mate: PropTypes.string.isRequired,
    lenguaje: PropTypes.string.isRequired,
    sociales: PropTypes.string.isRequired,
    ingles: PropTypes.string.isRequired,
  }).isRequired,
};
