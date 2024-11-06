// pages/index.js
import React from "react";
import dynamic from 'next/dynamic';

const Video = dynamic(() => import('../components/Video'), { ssr: false });

export default function HomePage() {
  return (
    <main 
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: "url('/img/inicio/fondo8n.png')" }}
    >
      <Video />
    </main>
  );
}


