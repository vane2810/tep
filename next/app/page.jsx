// Página de Inicio djwidwierjerjweio
import React from "react";
import Carousel from "@/components/home/carousel";
import dynamic from 'next/dynamic';

const Video = dynamic(() => import('@/components/video'), { ssr: false });


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