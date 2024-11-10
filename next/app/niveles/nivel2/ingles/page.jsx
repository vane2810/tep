// pages/niveles/nivel2/ingles.js
"use client";
import React from "react";
import WelcomeSection from "@/components/templates/subjects/welcomeSection";
import MapIngles from "@/components/templates/subjects/mapIngles";
import { SeparadorAnaranjado } from "@/components/separador";
import Volver from "@/components/elements/botonVolver";

export default function InglesPage() {
  // Configuración de los segmentos principales para cada subtema de ingles
  const segmentos = [
    { id: "vocabulary", name: "Vocabulario", imgSrc: "/img/materias/ingles/cohete_vocabulario.png", alt: "Ortografía" },
    { id: "grammar", name: "Gramática", imgSrc: "/img/materias/ingles/cohete_gramatica.png", alt: "Gramática" },
    { id: "multimedia", name: "Multimedia", imgSrc: "/img/materias/ingles/cohete_multimedia.png", alt: "Multimedia" },
  ];

  return (
    <main>
      <SeparadorAnaranjado />
      
      <div className="flex justify-center items-center w-full">
        <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
          <Volver href="/niveles/nivel2" img="/img/home/regresar/naranja.png" />
          {/* Bienvenida para ingles */}
          <WelcomeSection
            personajeImg="/img/personajes/griffit/griffit.png"
            personaje="Griffit"
            titulo="¡Inglés!"
          />

          {/* Mapa de subtemas para ingles */}
          <MapIngles
            segmentos={segmentos}
            fondoUrl="/img/materias/ingles/fondon2.png"
            planetaImg="/img/personajes/niveles/marten2.png"
            nivel="nivel2"
          />
        </div>
      </div>
      <SeparadorAnaranjado />
    </main>
  );
}