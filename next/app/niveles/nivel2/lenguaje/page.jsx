// Página Principal de Lenguaje - NIvel 2
"use client";
import React from "react";
import WelcomeSection from "@/components/templates/subjects/welcomeSection";
import MapLenguaje from "@/components/templates/subjects/mapLenguaje";
import { SeparadorMorado } from "@/components/separador";
import Volver from "@/components/elements/botonVolver";

export default function LenguajePage() {
  // Configuración de los segmentos principales para cada subtema de Lenguaje
  const segmentos = [
    { id: "ortografia", name: "Ortografia", imgSrc: "/img/materias/lenguaje/ortografia.webp", alt: "Ortografía" },
    { id: "gramatica", name: "Gramática", imgSrc: "/img/materias/lenguaje/gramatica.webp", alt: "Gramática" },
    { id: "generos_literarios", name: "Lectura", imgSrc: "/img/materias/lenguaje/generos.webp", alt: "Lectura" },
    { id: "lectura", name: "Escritura", imgSrc: "/img/materias/lenguaje/lectura.webp", alt: "Escritura" },
    { id: "multimedia", name: "Multimedia", imgSrc: "/img/materias/lenguaje/multimedia.webp", alt: "Multimedia" },
  ];

  return (
    <main>
      <SeparadorMorado />
      
      <div className="flex justify-center items-center w-full">
        <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
          <Volver href="/niveles/nivel2" img="/img/home/regresar/morado.webp" />
          {/* Bienvenida para Lenguaje */}
          <WelcomeSection
            personajeImg="/img/personajes/principe/principe.png"
            personaje="Profesor Principe"
            titulo="¡Lenguaje!"
          />

          {/* Mapa de subtemas para Lenguaje */}
          <MapLenguaje
            segmentos={segmentos}
            fondoUrl="/img/materias/lenguaje/fondon2.webp"
            planetaImg="/img/personajes/niveles/marten2.png"
            nivel="nivel2"
          />
        </div>
      </div>
      <SeparadorMorado />
    </main>
  );
}
