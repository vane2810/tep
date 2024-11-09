// Página principal de inglés - Nivel 3
import React from "react";
import WelcomeSection from '@/components/templates/subjects/welcomeSection';
import MapIngles from '@/components/templates/subjects/mapIngles';
import '@/styles/animacion.css';
import { SeparadorAnaranjado } from "@/components/separador";

export default function InglesPage() {
  const levels = [
    { id: 1, name: 'Vocabulario', img: '/img/niveless/ingles/cohete_vocabulario.png' },
    { id: 2, name: 'Gramática', img: '/img/niveless/ingles/cohete_gramatica.png' },
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
            volverUrl="/niveles/nivel3"
            personajeImg="/img/personajes/griffit/griffit.png"
            personajeAlt="Griffit"
            titulo="¡INGLÉS!"
            mensajeBienvenida="¡Bienvenidos a mi clase, soy el Profesor Griffit y te guiaré en esta aventura!"
          />

          {/* Mapa de niveles para Lenguaje */}
          <MapIngles
            subject="ingles"
            basePath="niveles/nivel3/"
            levels={levels}
            decorativos={decorativos}
            caricatura="/img/niveless/lenguaje/lvl1/astronautan1.png"
            fondoUrl="/img/niveless/ingles/fondo_ingles3.jpg" 
          />
        </div>
      </div>
      <SeparadorAnaranjado />
    </main>
  );
}
