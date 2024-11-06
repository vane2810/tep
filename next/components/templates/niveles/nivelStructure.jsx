// components/NivelTemplate.jsx
"use client";
import React, { useState, useEffect } from "react";
import Volver from "@/components/botonVolver";
import Link from "next/link";
import Typewriter from "@/components/typeWriter";
import Botones from "@/components/templates/niveles/botonStructure";
import { SeparadorAzul, SeparadorRojo } from "@/components/separador"; 
import "@/styles/animacion.css";
import useSession from "@/hooks/useSession";

export default function NivelTemplate({ fullText, images, planetName, planetNumber, gameIntroLink, buttonLinks, separadorColor }) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { session } = useSession();

  useEffect(() => {
    if (session && !localStorage.getItem("hasSeenWelcome")) {
      setShowWelcome(true);
      const timeout = setTimeout(() => {
        localStorage.setItem("hasSeenWelcome", "true");
        setShowWelcome(false);
      }, 10000);

      const imageInterval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);

      return () => {
        clearTimeout(timeout);
        clearInterval(imageInterval);
      };
    }
  }, [session, images]);

  const renderSeparador = () => {
    if (separadorColor === "azul") return <SeparadorAzul />;
    if (separadorColor === "rojo") return <SeparadorRojo />;
    return null;
  };

  return showWelcome ? (
    <div className="flex justify-center items-center bg-gradient-to-r from-purple-900 via-indigo-900 to-black h-screen text-white">
      <div className="text-center">
        {images.length > 0 && (
          <img src={images[currentImageIndex]} alt="Welcome" className="mx-auto mb-4 w-auto h-64" />
        )}
        <div className="font-bold text-3xl story">
          <Typewriter text={fullText} speed={80} />
        </div>
      </div>
    </div>
  ) : (
    <main>
      {renderSeparador()}
      <section>
        {!session && <Volver href="/" title="Volver a la página de inicio" />}
        <div className="flex md:flex-row flex-col justify-center items-center p-4 w-full">
          <div className="flex justify-center items-center p-4 w-full md:w-3/4">
            <div className="flex items-center">
              {images.length > 0 && (
                <img src={images[0]} alt={`Nivel ${planetNumber}`} className="mr-10 w-auto h-64 animate-tambaleo" />
              )}
              <p className="text-3xl text-black text-left md:text-3xl super">
                ¡BIENVENIDOS AL NIVEL {planetNumber}! <br /> PLANETA {planetName}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-8 md:mt-0 p-4 w-full md:w-1/4">
            <Link href={gameIntroLink}>
              <img src="/img/home/juego_intro.png" alt="Juego Introductorio" className="w-36 md:w-44 lg:w-52 xl:w-60 animate-float" />
            </Link>
          </div>
        </div>
      </section>
      {renderSeparador()}
      <Botones
        mate={buttonLinks.mate}
        lenguaje={buttonLinks.lenguaje}
        sociales={buttonLinks.sociales}
        ingles={buttonLinks.ingles}
      />
      {renderSeparador()}
    </main>
  );
}
