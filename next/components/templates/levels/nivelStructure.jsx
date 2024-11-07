// components/NivelTemplate.jsx
"use client";
import React, { useState, useEffect } from "react";
import Volver from "@/components/elements/botonVolver";
import Link from "next/link";
import WelcomeMessage from "@/components/templates/levels/welcomeStructure";
import useSession from "@/hooks/useSession";
import PropTypes from "prop-types";

// Subcomponente para un botón individual
function ButtonLink({ href, src, alt }) {
  return (
    <Link href={href}>
      <img
        src={src}
        alt={alt}
        className="hover:shadow-lg rounded-full w-32 md:w-40 lg:w-48 transform transition-transform hover:scale-105"
      />
    </Link>
  );
}

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
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
      {/* Bienvenida */}
      <section className="relative flex flex-col items-center bg-white bg-opacity-90 mt-6 mb-2 p-4 rounded-full w-full max-w-3xl text-center">
        {/* Botón de volver, alineado a la izquierda con margen */}
        {!session && (
          <div className="top-4 md:top-6 left-4 md:left-6 absolute">
            <Volver href="/" title="Volver a la página de inicio" />
          </div>
        )}

        {/* Texto de Bienvenida */}
        <div className="flex flex-col justify-center items-center mt-8 md:mt-0 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-wider super">¡Bienvenido al Nivel {planetNumber}!</h2>
          <p className="mt-2 text-xl sm:text-2xl md:text-3xl wonder">PLANETA {planetName}</p>
        </div>
      </section>

      {/* Contenedor de la imagen del planeta y los botones */}
      <section className="flex md:flex-row flex-col justify-center items-center space-y-6 md:space-y-0 mt-2 p-6 rounded-lg w-full max-w-5xl">
        {/* Botones a la izquierda (apilan en pantallas pequeñas) */}
        <div className="flex flex-col items-center space-y-6 md:space-y-6 md:mr-6">
          <ButtonLink href={buttonLinks.mate} src="/img/personajes/donkey/donkeyboton.png" alt="Matemática" />
          <ButtonLink href={buttonLinks.lenguaje} src="/img/personajes/principe/principeboton.png" alt="Lenguaje" />
        </div>

        {/* Imagen central del planeta */}
        <div className="flex justify-center items-center mx-6">
          <img
            src={planetImg}
            alt={`Nivel ${planetNumber}`}
            className="w-48 md:w-64 lg:w-80 animate-float"
          />
        </div>

        {/* Botones a la derecha (apilan en pantallas pequeñas) */}
        <div className="flex flex-col items-center space-y-6 md:space-y-6 md:ml-6">
          <ButtonLink href={buttonLinks.sociales} src="/img/personajes/burbuja/burbujaboton.png" alt="Sociales" />
          <ButtonLink href={buttonLinks.ingles} src="/img/personajes/griffit/griffitboton.png" alt="Inglés" />
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
