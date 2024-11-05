// Página de Inicio djwidwierjerjweio
import React from "react";
import Carousel from "../components/carousel";
import Video from "@/components/video";


export default function HomePage() {
  return (
    <main className="bg-black">
        {/* Botones (Planetas) */}
        <Video />
      {/* Carrusel */}
      <Carousel />
    </main>
  );
}