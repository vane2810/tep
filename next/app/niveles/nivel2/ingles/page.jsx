import React from "react";
import WelcomeSection from '@/components/templates/materias/welcomeSection';
import MapIngles from '@/components/templates/materias/mapLenguaje';
import '@/styles/animacion.css';
import { SeparadorAnaranjado } from "@/components/separador";

export default function LenguajePage() {
  const levels = [
    { id: 1, name: 'Vocabulario', position: { top: '85%', left: '10%' }, color: 'white', img: '/img/niveless/ingles/cohete_vocabulario.png' },
    { id: 2, name: 'Gramática', position: { top: '78%', left: '20%' }, color: 'white', img: '/img/niveless/ingles/contenido_ingles.jpg' },
  ];

  const decorativos = [
    { img: '/img/niveless/lenguaje/lvl1/planetan1.png', alt: 'Planeta', className: 'planet-animation', style: { top: '9%', left: '90%', width: '8vw' } },
    { img: '/img/niveless/lenguaje/lvl1/coheten1.png', alt: 'Cohete', className: 'rocket-animation', style: { top: '5%', left: '5%', width: '8vw' } },
  ];

  return (
    <main>
      <SeparadorAnaranjado/>
      <div className="flex justify-center items-center w-full">
        <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
          {/* Bienvenida para Lenguaje */}
          <WelcomeSection
            volverUrl="/niveles/nivel2"
            personajeImg="/img/personajes/griffit/griffit.png"
            personajeAlt="Griffit"
            titulo="¡INGLÉS!"
            mensajeBienvenida="¡Bienvenidos a mi clase, soy el Profesor Griffit y te guiaré en esta aventura!"
          />

          {/* Mapa de niveles para Lenguaje */}
          <MapIngles
            subject="lenguaje"
            basePath="niveles/nivel2/"
            levels={levels}
            fondoUrl="/img/niveless/ingles/fondo_ingles2.jpg"
            decorativos={decorativos}
            caricatura="/img/niveless/lenguaje/lvl1/astronautan1.png"
          />
        </div>
      </div>
      <SeparadorAnaranjado />
    </main>
  );
}
