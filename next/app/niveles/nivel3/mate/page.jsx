// pages/niveles/nivel1/matematica.js
import React from "react";
import WelcomeSection from "@/components/templates/subjects/welcomeSection";
import MateMap from "@/components/templates/subjects/mapMate";
import Volver from "@/components/elements/botonVolver";

export default function MatematicaPage() {
  const segmentos = [
    { id: "ob", imgSrc: "/img/materias/mate/ob_n3.png", alt: "Operaciones Básicas" },
    { id: "decimale", imgSrc: "/img/materias/mate/decimales_n3.png" , alt: "Números Decimales" },
    { id: "geometri", imgSrc: "/img/materias/mate/geometria_n3.png", alt: "Geometría" },
    { id: "multimedia", imgSrc: "/img/materias/mate/multimedia_n3.png", alt: "Resolución de Problemas" },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Volver href="/niveles/nivel3" img="/img/home/regresar/amarillo.png" />
      <WelcomeSection
        personajeImg="/img/personajes/donkey/donkey.png"
        personaje="Donkey"
        titulo="¡Matemática!"
      />

      {/* Gusano con cabeza y segmentos */}
      <MateMap
        mostrarCabeza={false}
        segmentos={segmentos}
        nivel="nivel3"
      />
    </main>
  );
}
