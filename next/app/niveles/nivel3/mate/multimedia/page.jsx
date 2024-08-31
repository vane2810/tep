"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorMorado } from "@/components/separador";

export default function MatematicaPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (url) => {
    setVideoUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
  };

  // Lista de temas con sus URLs de videos
  const temas = [
    { id: 1, title: "Tema 1", description: "Descripción del tema 1", img: "/img/niveles/mate/tema12.png", videoUrl: "https://www.youtube.com/embed/videoID1" },
    { id: 2, title: "Tema 2", description: "Descripción del tema 2", img: "/img/niveles/mate/tema11.png", videoUrl: "https://www.youtube.com/embed/videoID2" },
    { id: 3, title: "Tema 3", description: "Descripción del tema 3", img: "/img/niveles/mate/tema10.png", videoUrl: "https://www.youtube.com/embed/videoID3" },
    { id: 4, title: "Tema 4", description: "Descripción del tema 4", img: "/img/niveles/mate/tema9.png", videoUrl: "https://www.youtube.com/embed/videoID4" },
    { id: 5, title: "Tema 5", description: "Descripción del tema 5", img: "/img/niveles/mate/tema8.png", videoUrl: "https://www.youtube.com/embed/videoID5" },
    { id: 6, title: "Tema 6", description: "Descripción del tema 6", img: "/img/niveles/mate/tema7.png", videoUrl: "https://www.youtube.com/embed/videoID6" },
    { id: 7, title: "Tema 7", description: "Descripción del tema 7", img: "/img/niveles/mate/tema6.png", videoUrl: "https://www.youtube.com/embed/videoID1" },
    { id: 8, title: "Tema 8", description: "Descripción del tema 8", img: "/img/niveles/mate/tema5.png", videoUrl: "https://www.youtube.com/embed/videoID2" },
    { id: 9, title: "Tema 9", description: "Descripción del tema 9", img: "/img/niveles/mate/tema4.png", videoUrl: "https://www.youtube.com/embed/videoID3" },
    { id: 10, title: "Tema 10", description: "Descripción del tema 10", img: "/img/niveles/mate/tema3.png", videoUrl: "https://www.youtube.com/embed/videoID4" },
    { id: 11, title: "Tema 11", description: "Descripción del tema 11", img: "/img/niveles/mate/tema2.png", videoUrl: "https://www.youtube.com/embed/videoID5" },
    { id: 12, title: "Tema 12", description: "Descripción del tema 12", img: "/img/niveles/mate/tema1.png", videoUrl: "https://www.youtube.com/embed/videoID6" },
  ];

  return (
    <main>
      {/* Bienvenida de personaje */}
      <section>
        <SeparadorAzul />
        <div className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 py-8">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel3/mate">
              <img 
                src="/img/home/regresar.png" 
                alt="Volver" 
                className="w-10 h-auto transform hover:scale-110 transition-transform" 
                title="Volver a la página anterior" 
              />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center bg-white p-4 rounded-lg shadow-lg">
              <img 
                src="/img/niveles/mate/starlyvideo3.png" 
                alt="Animated Image" 
                className="h-40 md:h-64 w-auto mb-4 md:mb-0 md:mr-4 rounded-lg shadow-lg" 
              />
              <p className="text-black super text-lg md:text-2xl max-w-lg leading-relaxed">
              "Explora el mundo del aprendizaje visual con nuestra colección de videos educativos. ¡Aprender nunca ha sido tan interactivo!"
              </p>
            </div>
          </div>
        </div>
        <SeparadorMorado />
      </section>

      {/* Sección de temas */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl text-center font-semibold mb-8">Elige tu Tema</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {temas.map((tema) => (
              <div 
                key={tema.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                onClick={() => openModal(tema.videoUrl)}
              >
                <img 
                  src={tema.img} 
                  alt={tema.title} 
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{tema.title}</h3>
                  <p className="text-gray-600 mt-2">{tema.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal para el video */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="relative pb-56.25">
              <iframe 
                src={videoUrl}
                title="YouTube Video"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <button 
              className="mt-4 text-red-600 hover:text-red-800"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}