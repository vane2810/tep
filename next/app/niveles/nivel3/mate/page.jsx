// pages/niveles/nivel1/matematica.js
import React from "react";
import WelcomeSection from "@/components/templates/subjects/welcomeSection";
import MateMap from "@/components/templates/subjects/mapMate";
import Volver from "@/components/elements/botonVolver";
import { SeparadorVerde } from "@/components/separador";

export default function MatematicaPage() {
  const segmentos = [
    { id: "ob", name: "Operaciones Básicas", imgSrc: "/img/materias/mate/ob_n3.webp", alt: "Operaciones Básicas" },
    { id: "decimales", name: "Decimales y Fracciones", imgSrc: "/img/materias/mate/decimales_n3.webp", alt: "Números Decimales" },
    { id: "geometria", name: "Geometria", imgSrc: "/img/materias/mate/geometria_n3.webp", alt: "Geometría" },
    { id: "multimedia", name: "Contenido Multimedia", imgSrc: "/img/materias/mate/multimedia_n3.webp", alt: "Resolución de Problemas" },
  ];

  return (
    <main>
      <SeparadorVerde />
      <div className="flex justify-center items-center w-full">
        <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
          <Volver href="/niveles/nivel3" img="/img/home/regresar/verde.webp" />
          <WelcomeSection
            personajeImg="/img/personajes/donkey/donkey.webp"
            personaje="Profesor Donkey"
            titulo="¡Matemática!"
          />

          {/* Gusano con cabeza y segmentos */}
          <MateMap
            mostrarCabeza={false}
            segmentos={segmentos}
            nivel="nivel3"
            fondoUrl="/img/materias/mate/fondon1.webp"
            planetaImg="/img/personajes/niveles/jupitern3.webp"
          />
        </div>
      </div>
      <SeparadorVerde />
    </main>
  );
}
