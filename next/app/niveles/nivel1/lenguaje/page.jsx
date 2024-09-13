"use client";  // Asegura que todo el código se ejecute en el cliente

import React from "react";
import Link from 'next/link';
import { SeparadorRosa } from "@/components/separador";  // Mantén tus componentes importados
import '@/styles/globals.css';
import '@/styles/animacion.css';

export default function LenguajePage() {
  const levels = [
    { id: 1, position: { top: '85%', left: '10%' } },  // Nivel 1 empieza más abajo
    { id: 2, position: { top: '78%', left: '20%' } },
    { id: 3, position: { top: '70%', left: '30%' } },
    { id: 4, position: { top: '65%', left: '40%' } },
    { id: 5, position: { top: '60%', left: '50%' } },
    { id: 6, position: { top: '55%', left: '60%' } },
    { id: 7, position: { top: '50%', left: '69%' } },
    { id: 8, position: { top: '45%', left: '78%' } },
    { id: 9, position: { top: '35%', left: '84%' } },  // Nivel 9 se acerca más al planeta
    { id: 10, position: { top: '22%', left: '87%' } }  // Nivel 10 más cerca del planeta
  ];

  return (
    <main className="flex justify-center items-center">
      <div className="w-[90%] mx-auto"> {/* Márgenes en ambos lados */}
        {/* Bienvenida de Donkey */}
        <section>
          <SeparadorRosa />
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel1">
              <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center mb-5">
            <div className="flex flex-col items-center md:mr-8 md:ml-2.5 mb-4 md:mb-0">
              <img src="/img/personajes/donkey/donkeysaludo.png" alt="Donkey" className="h-64 w-auto mx-2.5 md:mr-8 md:ml-2.5" />
            </div>
            <p className="text-black super text-4xl md:text-6xl md:ml-8">LENGUAJE</p>
          </div>
          <SeparadorRosa />
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
        .galaxy-map {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .map-background {
          background-image: url('/img/niveless/lenguaje/lvl1/fondon1.jpg'); /* Fondo galáctico */
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
          width: 4vw; /* Tamaño más pequeño para las estrellas */
          height: 4vw;
          cursor: pointer;
        }

        .level-number {
          color: white;
          font-size: 2vw; /* Tamaño del número */
          margin-top: 5px;
        }

        .astronaut {
          position: absolute;
          bottom: 5%;  /* Astronauta en la esquina inferior izquierda */
          left: 5%;
          transform: translate(-50%, -50%);
        }

        .astronaut-icon {
          width: 6vw; /* Tamaño adaptable del astronauta */
          height: auto;
        }

        .galaxy-decorations {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .planet {
          position: absolute;
          top: 10%;
          left: 90%; /* Mueve el planeta más a la esquina */
          width: 10vw; /* Tamaño adaptable del planeta */
          animation: float 5s ease-in-out infinite;
        }

        .rocket {
          position: absolute;
          top: 5%; /* Ajusta el cohete a la esquina superior izquierda */
          left: 5%;
          width: 8vw; /* Tamaño adaptable del cohete */
          animation: move-rocket 5s ease-in-out infinite alternate; /* Movimiento controlado */
        }

        .comet {
          position: absolute;
          bottom: 5%; /* Ajusta la nave a la esquina inferior derecha */
          right: 5%;
          width: 6vw; /* Tamaño adaptable de la nave */
          animation: move-comet 8s ease-in-out infinite alternate; /* Movimiento controlado */
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px); /* Suaviza el movimiento flotante */
          }
        }

        @keyframes move-rocket {
          0% {
            top: 5%;
            left: 5%;
          }
          100% {
            top: 10%; /* El cohete se mueve hacia arriba */
            left: 15%; /* y a la derecha */
          }
        }

        @keyframes move-comet {
          0% {
            bottom: 5%;
            right: 5%;
          }
          100% {
            bottom: 10%; /* La nave se mueve hacia abajo */
            right: 15%; /* y a la izquierda */
          }
        }
      `}</style>
    </main>
  );
}

