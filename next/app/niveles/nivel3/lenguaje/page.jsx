// Página principal de Lenguaje - Nivel 3
import React from "react";
import WelcomeSection from '@/components/templates/materias/welcomeSection';
import LevelMap from '@/components/templates/materias/levelMap';
import '@/styles/animacion.css';
import { SeparadorMorado } from "@/components/separador";

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

  const decorativos = [
    { img: '/img/niveless/lenguaje/lvl1/planetan1.png', alt: 'Planeta', className: 'planet-animation', style: { top: '9%', left: '90%', width: '8vw' } },
    { img: '/img/niveless/lenguaje/lvl1/coheten1.png', alt: 'Cohete', className: 'rocket-animation', style: { top: '5%', left: '5%', width: '8vw' } },
    { img: '/img/niveless/lenguaje/lvl1/naven1.png', alt: 'Cometa', className: 'comet-animation', style: { right: '5%', bottom: '5%', width: '6vw' } },
  ];

  return (
    <main>
      <SeparadorMorado />
      <div className="flex justify-center items-center w-full">

        <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
          {/* Bienvenida para Lenguaje */}
          <WelcomeSection
            volverUrl="/niveles/nivel3"
            personajeImg="/img/personajes/principe/principe.png"
            personajeAlt="Principe"
            titulo="¡Lenguaje!"
            mensajeBienvenida="¡Bienvenidos a mi clase, soy el Profesor Principe y te guiaré en esta aventura!"
          />

          {/* Mapa de niveles para Lenguaje */}
          <LevelMap
            subject="lenguaje"
            basePath="niveles/nivel3/"
            levels={levels}
            fondoUrl="/img/niveless/lenguaje/lvl1/fondon3.jpg"
            decorativos={decorativos}
          />
        </div>
      </div>
      <SeparadorMorado />
    </main>
  );
}
