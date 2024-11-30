// pages/niveles/nivel1/matematica.js
import React from "react";
import WelcomeSection from "@/components/templates/subjects/welcomeSection";
import MateMap from "@/components/templates/subjects/mapMate";
import Volver from "@/components/elements/botonVolver";

export default function MatematicaPage() {
  const segmentos = [
    { id: "ob", name: "Operaciones Básicas", imgSrc: "/img/materias/mate/ob_n2.webp", alt: "Operaciones Básicas" },
    { id: "decimale", name: "Decimales y Fracciones", imgSrc: "/img/materias/mate/decimales_n2.webp", alt: "Números Decimales" },
    { id: "geometri", name: "Geometria", imgSrc: "/img/materias/mate/geometria_n2.webp", alt: "Geometría" },
    { id: "multimedia", name: "Contenido Multimedia", imgSrc: "/img/materias/mate/multimedia_n2.webp", alt: "Resolución de Problemas" },
  ];

  return (
    <div className="flex justify-center items-center w-full">
      <div className="mx-auto mb-10 px-8 w-full max-w-7xl">
        <Volver href="/niveles/nivel2" img="/img/home/regresar/amarillo.webp" />
        <WelcomeSection
          personajeImg="/img/personajes/donkey/donkey.png"
          personaje="Profesor Donkey"
          titulo="¡Matemática!"
        />

        {/* Gusano con cabeza y segmentos */}
        <MateMap
          mostrarCabeza={false}
          segmentos={segmentos}
          nivel="nivel2"
          fondoUrl="/img/materias/mate/selva.webp"
          planetaImg="/img/personajes/niveles/marten2.png"
        />
      </div>
    </div>
  );
}
