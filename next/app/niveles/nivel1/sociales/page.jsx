// Página principal de Sociales - Nivel 1
import React from "react";
import WelcomeSection from '@/components/templates/materias/welcomeSection';
import LevelMap from '@/components/templates/materias/mapLenguaje';
import '@/styles/animacion.css';
import { SeparadorAzul } from "@/components/separador";

export default function SocialesPage() {
  const levels = [
    { id: 1, position: { top: '85%', left: '10%' }, color: 'black' },
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
    { img: '/img/niveles/sociales/cangrejo.png', alt: 'Cangrejo', className: 'rocket-animation', style: { top: '5%', left: '5%', width: '8vw' } },
    { img: '/img/niveles/sociales/tiburon.png', alt: 'Tiburon', className: 'comet-animation', style: { right: '5%', bottom: '5%', width: '6vw' } },
  ];

  return (
    <main>
      <SeparadorAzul />
      <div className="flex justify-center items-center w-full">

        <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
          {/* Bienvenida para Sociales */}
          <WelcomeSection
            volverUrl="/niveles/nivel1"
            personajeImg="/img/personajes/burbuja/burbuja.png"
            personajeAlt="Burbuja"
            titulo="¡SOCIALES!"
            mensajeBienvenida="¡Bienvenidos a mi clase, soy la Profesora Burbuja y te guiaré en esta aventura!"
          />

          {/* Mapa de niveles para Sociales */}
          <LevelMap
            subject="sociales"
            basePath="niveles/nivel1/"
            levels={levels}
            fondoUrl="/img/niveles/sociales/fondon1s.jpg"
            decorativos={decorativos}
            camino="/img/niveles/sociales/cofre.png"
            caricatura="/img/niveles/sociales/pirata.png"
          />
        </div>
      </div>
      <SeparadorAzul />
    </main>
  );
}