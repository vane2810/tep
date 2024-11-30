// pages/niveles/nivel1/matematica.js
import React from "react";
import WelcomeSection from "@/components/templates/subjects/welcomeSection";
import MateMap from "@/components/templates/subjects/mapMate";
import Volver from "@/components/elements/botonVolver";
import { SeparadorVerde } from "@/components/separador";

export default function MatematicaPage() {
  const segmentos = [
    { id: "ob", name: "Operaciones Básicas", imgSrc: "/img/materias/mate/ob_n1.webp", alt: "Operaciones Básicas" },
    { id: "decimales", name: "Decimales y Fracciones", imgSrc: "/img/materias/mate/decimales_n1.webp", alt: "Números Decimales" },
    { id: "geometria", name: "Geometria", imgSrc: "/img/materias/mate/geometria_n1.webp", alt: "Geometría" },
    { id: "multimedia", name: "Contenido Multimedia", imgSrc: "/img/materias/mate/multimedia_n1.webp", alt: "Resolución de Problemas" },
  ];

  return (
    <main>
      <SeparadorVerde/>
      <div className="flex justify-center items-center bg-gray-50 w-full">
        <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
          <Volver href="/niveles/nivel1" img="/img/home/regresar/verde.webp" />
          <WelcomeSection
            personajeImg="/img/personajes/donkey/donkey.png"
            personaje="Profesor Donkey"
            titulo="¡MATEMÁTICAS!"

          />
          {/* Gusano con cabeza y segmentos */}
          <MateMap
            mostrarCabeza={true}
            cabezaSrc="/img/materias/mate/cabeza_n1.webp"
            segmentos={segmentos}
            nivel="nivel1"
            fondoUrl="/img/materias/mate/fondon1.webp"
            planetaImg="/img/personajes/niveles/tierran1.png"
          />
        </div>
      </div>
      <SeparadorVerde/>
    </main>
  );
}
