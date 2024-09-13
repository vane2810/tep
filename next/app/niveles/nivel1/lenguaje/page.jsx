// Inicio Lenguaje - Nivel 1

"use client";
import React from "react";
import Link from 'next/link';
import { SeparadorAmarillo, SeparadorRosa } from "@/components/separador";  // Mantén tus componentes importados
import '@/styles/globals.css';
import '@/styles/animacion.css';

export default function LenguajePage() {
  const levels = [
    { id: 1, position: { top: '85%', left: '10%' } },
    { id: 2, position: { top: '78%', left: '20%' } },
    { id: 3, position: { top: '70%', left: '30%' } },
    { id: 4, position: { top: '65%', left: '40%' } },
    { id: 5, position: { top: '60%', left: '50%' } },
    { id: 6, position: { top: '55%', left: '60%' } },
    { id: 7, position: { top: '50%', left: '69%' } },
    { id: 8, position: { top: '45%', left: '78%' } },
    { id: 9, position: { top: '35%', left: '84%' } },
    { id: 10, position: { top: '22%', left: '87%' } }
  ];

  return (
    <main className="flex justify-center items-center">
      <div className="w-[90%] mx-auto"> {/* Márgenes en ambos lados */}
        {/* Bienvenida de Donkey */}
        <section className="welcome-section">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel1">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center mb-5 welcome-content">
            <div className="flex flex-col items-center md:mr-8 md:ml-2.5 mb-4 md:mb-0">
              <img src="/img/personajes/principe/principesaludo.png" alt="Donkey" className="h-64.3 w-auto mx-2.3 md:mr-8 md:ml-2.5" />
            </div>
            <p className="super text-white font-bold text-4xl md:text-6xl md:ml-8 neon-text">¡Lenguaje!</p>
          </div>
          <p className="text-white text-center text-2xl">Navega por las estrellas y explora cada contenido de la materia. ¡Aprender es una aventura galáctica!</p>
        </section>

        {/* Mapa Galáctico */}
        <section className="galaxy-map">
          <div className="map-background">
            {/* Astronauta al inicio */}
            <div className="astronaut">
              <img src="/img/niveless/lenguaje/lvl1/astronautan1.png" alt="Astronauta" className="astronaut-icon" />
            </div>

            {/* Muestra cada nivel */}
            {levels.map((level) => (
              <div
                key={level.id}
                className="level"
                style={{ top: level.position.top, left: level.position.left }}
              >
                <Link href={`/niveles/nivel${level.id}`}>
                  <img
                    src="/img/niveless/lenguaje/lvl1/estrella.png"
                    alt={`Nivel ${level.id}`}
                    className="level-icon"
                  />
                </Link>
                <span className="level-number">{level.id}</span>
              </div>
            ))}

            {/* Elementos decorativos de galaxia */}
            <div className="galaxy-decorations">
              <img src="/img/niveless/lenguaje/lvl1/planetan1.png" alt="Planeta" className="decoration planet" />
              <img src="/img/niveless/lenguaje/lvl1/coheten1.png" alt="Cohete" className="decoration rocket" />
              <img src="/img/niveless/lenguaje/lvl1/naven1.png" alt="Cometa" className="decoration comet" />
            </div>
          </div>
        </section>
      </div>

      {/* Estilos CSS incluidos en el mismo archivo usando styled-jsx */}
      <style jsx>{`
        .welcome-section {
          background-color: #4527a0; /* Color que solicitaste */
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          color: #fff;
        }

        .welcome-content {
          color: white;
        }

        .neon-text {
          color: #000000; /* Blanco */
          font-weight: bold;
          text-shadow: 
          0 0 5px #ffee58 ,   /* Reflejo suave amarillito */
          0 0 10px #ffffcc,
          0 0 15px #ffffcc;
        }

        .galaxy-map {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .map-background {
          background-image: url('/img/niveless/lenguaje/lvl1/fondon1.jpg');
          background-size: cover;
          background-position: center;
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }

        .level {
          position: absolute;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .level-icon {
          width: 4vw;
          height: 4vw;
          cursor: pointer;
        }

        .level-number {
          color: white;
          font-size: 2vw;
          margin-top: 5px;
        }

        .astronaut {
          position: absolute;
          bottom: 5%;
          left: 5%;
          transform: translate(-50%, -50%);
        }

        .astronaut-icon {
          width: 6vw;
          height: auto;
        }

        .galaxy-decorations {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .planet {
          position: absolute;
          top: 9%;
          left: 90%;
          width: 8vw;
          animation: float 5s ease-in-out infinite;
        }

        .rocket {
          position: absolute;
          top: 5%;
          left: 5%;
          width: 8vw;
          animation: move-rocket 5s ease-in-out infinite alternate;
        }

        .comet {
          position: absolute;
          bottom: 5%;
          right: 5%;
          width: 6vw;
          animation: move-comet 8s ease-in-out infinite alternate;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes move-rocket {
          0% {
            top: 5%;
            left: 5%;
          }
          100% {
            top: 10%;
            left: 15%;
          }
        }

        @keyframes move-comet {
          0% {
            bottom: 5%;
            right: 5%;
          }
          100% {
            bottom: 10%;
            right: 15%;
          }
        }
      `}</style>
    </main>
  );
}
