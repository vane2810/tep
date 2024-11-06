// pages/index.js
import React from "react";
import dynamic from 'next/dynamic';

const Video = dynamic(() => import('../components/Video'), { ssr: false });

export default function HomePage() {
  return (
    <main 
      className="flex justify-center items-center bg-cover bg-center w-full min-h-screen" 
      style={{ backgroundImage: "url('/img/inicio/fondo8n.png')" }}
    >
      <Video />
    </main>
  );
}


