// pages/niveles/nivel1/matematica.js
import React from "react";
import WelcomeSection from "@/components/templates/subjects/welcomeSection";
import MateMap from "@/components/templates/subjects/mapMate";
import Volver from "@/components/elements/botonVolver";

export default function MatematicaPage() {
  const segmentos = [
    { id: "ob", imgSrc: "/img/niveles/mate/nivel1/ob.png", alt: "Operaciones Básicas" },
    { id: "decimale", imgSrc: "/img/niveles/mate/nivel1/NDYF.png", alt: "Números Decimales" },
    { id: "geometria", imgSrc: "/img/niveles/mate/nivel1/geo.png", alt: "Geometría" },
    { id: "multimedia", imgSrc: "/img/niveles/mate/nivel1/refuerzof.png", alt: "Resolución de Problemas" },
  ];


  return (
    <main className="flex flex-col min-h-screen">
      <Volver href="/niveles/nivel1" img="/img/home/regresar/amarillo.png" />
      <WelcomeSection
        personajeImg="/img/personajes/donkey/donkey.png"
        personaje="Donkey"
        titulo="¡Matemática!"
      />

      {/* Gusano con cabeza y segmentos */}
      <MateMap
        mostrarCabeza={true}
        cabezaSrc="/img/niveles/mate/nivel1/cabeza.png"
        segmentos={segmentos}
      />
    </main>
  );
}
