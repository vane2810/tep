// Inicio del Nivel 1 (botones de materias)
"use client";
"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { SeparadorRosa } from "@/components/separador";

export default function Nivel1() {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bgColor, setBgColor] = useState("#fff1e6");

  const fullText = "¡Hola, pequeños genios! Es hora de comenzar el Nivel 1. ¡Vamos a jugar y aprender!";
  const images = [
    "/img/niveles/mate/nivel1/bienvenida/mundito1.png", 
    "/img/niveles/mate/nivel1/bienvenida/mundito2.png", 
    "/img/niveles/mate/nivel1/bienvenida/mundito3.png"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    const typeWriter = (text, index = 0) => {
      if (index <= text.length) {
        setText(text.slice(0, index));
        setTimeout(() => typeWriter(text, index + 1), 100);
      }
    };

    typeWriter(fullText);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 4000);

    return () => {
      clearTimeout(timeout);
      clearInterval(imageInterval);
    };
  }, []);

  const handleMouseEnter = (color) => {
    setBgColor(color);
  };

  const handleMouseLeave = () => {
    setBgColor("#fff1e6");
  };

  return isLoading ? (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-black text-white">
      <div className="text-center">
        <img
          src={images[currentImageIndex]}
          alt="Welcome"
          className="h-64 w-auto mb-4 mx-auto"
        />
        <p className="text-3xl font-mono">{text}</p>
      </div>
    </div>
  ) : (
    <main>
      <style jsx>{`
        @keyframes tambaleo {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        .animate-tambaleo {
          animation: tambaleo 1s infinite;
        }


        /* Animación de latido (pulse) */
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .pulse-animation {
          animation: pulse 1.5s infinite;
        }
      `}</style>

      <section>
        <SeparadorRosa />
        <div className="mt-6 ml-10 inline-block">
          <Link href="/">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center mb-5">
          <div className="flex flex-col items-center md:mr-8 md:ml-2.5 mb-4 md:mb-0">
            {/* Agregar clase para tambaleo a la imagen */}
            <img src="/img/niveles/mate/nivel1/bienvenida/mundito1.png" alt="Donkey" className="h-64 w-auto mx-2.5 md:mr-8 md:ml-2.5 animate-tambaleo" />
          </div>
          <p className="text-black super text-2xl md:text-2xl md:ml-8">"¡BIENVENIDOS AL NIVEL UNO! PREPÁRENSE PARA UNA AVENTURA DE APRENDIZAJE LLENA DE SORPRESAS Y DIVERSIÓN."</p>
        </div>
        <SeparadorRosa />
      </section>

      {/* Sección de materias con el color de fondo dinámico */}
      <div
        className="flex flex-col justify-center items-center mb-10 p-10"
        style={{
          backgroundColor: bgColor,
          minHeight: "300px",
          borderRadius: "10px",
        }}
      >
        <div className="flex justify-center items-center mb-10">
          {/* Agregar la clase de latido a los botones */}
          <Link href="/niveles/nivel1/mate">
            <img
              src="/img/personajes/donkey/donkeyboton.png"
              alt="Matematica"
              className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-4 pulse-animation"
              onMouseEnter={() => handleMouseEnter("#ffe4e1")}
              onMouseLeave={handleMouseLeave}
            />
          </Link>
          <Link href="/niveles/nivel1/lenguaje">
            <img
              src="/img/personajes/principe/principeboton.png"
              alt="Lenguaje"
              className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-4 pulse-animation"
              onMouseEnter={() => handleMouseEnter("#e6e6fa")}
              onMouseLeave={handleMouseLeave}
            />
          </Link>
          <Link href="/niveles/nivel1/ingles">
            <img
              src="/img/personajes/griffit/griffitboton.png"
              alt="Ingles"
              className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-4 pulse-animation"
              onMouseEnter={() => handleMouseEnter("#f0e68c")}
              onMouseLeave={handleMouseLeave}
            />
          </Link>
          <Link href="/niveles/nivel1/sociales">
            <img
              src="/img/personajes/burbuja/burbujaboton.png"
              alt="Sociales"
              className="boton w-40 md:w-48 lg:w-56 xl:w-64 mx-4 pulse-animation"
              onMouseEnter={() => handleMouseEnter("#d3ffce")}
              onMouseLeave={handleMouseLeave}
            />
          </Link>
        </div>

        <div className="flex justify-center items-center my-10">
          <Link
            href="/games/lvl1/intro"
            className="w-40 h-20 md:w-50 lg:w-60 bg-purple-500 text-white text-center font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-purple-700"
            onMouseEnter={() => handleMouseEnter("#add8e6")}
            onMouseLeave={handleMouseLeave}
          >
            Juego Introductorio
          </Link>
        </div>
      </div>
    </main>
  );
}
