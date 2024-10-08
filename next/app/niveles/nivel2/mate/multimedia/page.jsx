//Pagina de repaso - Nivel 2
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { SeparadorAzul, SeparadorMorado } from "@/components/separador";

export default function MatematicaPage() {
  const [unlocked, setUnlocked] = useState([1]); // El tema 1 está desbloqueado inicialmente
  const [videoUrl, setVideoUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (url, id) => {
    setVideoUrl(url);
    setIsModalOpen(true);
    // Desbloquea el siguiente tema si aún no está desbloqueado
    if (unlocked.length < id + 1) {
      setUnlocked([...unlocked, id + 1]);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
  };

  const temas = [
    { id: 1, title: "SUMA", img: "/img/niveles/mate/tema1.png", videoUrl: "https://www.youtube.com/embed/qwp9rmW04SU" },
    { id: 2, title: "RESTA", img: "/img/niveles/mate/tema2.png", videoUrl: "https://www.youtube.com/embed/7xZmvV9u6ls" },
    { id: 3, title: "MULTIPLICACIÓN", img: "/img/niveles/mate/tema3.png", videoUrl: "https://www.youtube.com/embed/M_KTwNWVt5c" },
    { id: 4, title: "DIVISIÓN", img: "/img/niveles/mate/tema4.png", videoUrl: "https://www.youtube.com/embed/20gkmv731VI" },
    { id: 5, title: "INTRODUCCIÓN A LOS NÚMEROS DECIMALES", img: "/img/niveles/mate/tema5.png", videoUrl: "https://www.youtube.com/embed/6uSN7MBb35Q" },
    { id: 6, title: "COMPARACIÓN DE NÚMEROS DECIMALES", img: "/img/niveles/mate/tema6.png", videoUrl: "https://www.youtube.com/embed/hdfQZ-sB7gw" },
    { id: 7, title: "SUMA Y RESTA DE NÚMEROS DECIMALES", img: "/img/niveles/mate/tema7.png", videoUrl: "https://www.youtube.com/embed/L70rINFflUw" },
    { id: 8, title: "FRACCIONES SIMPLES", img: "/img/niveles/mate/tema8.png", videoUrl: "https://www.youtube.com/embed/xXkmN7io71w" },
    { id: 9, title: "FIGURAS GEOMÉTRICAS", img: "/img/niveles/mate/tema9.png", videoUrl: "https://www.youtube.com/embed/I-6yrK30c84" },
    { id: 10, title: "PERÍMETRO", img: "/img/niveles/mate/tema10.png", videoUrl: "https://www.youtube.com/embed/xysXV7cBfcU" },
    { id: 11, title: "ÁNGULOS", img: "/img/niveles/mate/tema11.png", videoUrl: "https://www.youtube.com/embed/c9CI3JZUYas" },
    { id: 12, title: "SIMETRÍA", img: "/img/niveles/mate/tema12.png", videoUrl: "https://www.youtube.com/embed/fgcs8bHmNTU" },
  ];

  return (
    <main>
      <style jsx>{`
        @keyframes tambaleo {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        .animate-tambaleo {
          animation: tambaleo 1s infinite;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.9); /* Aumenté la opacidad del fondo */
          z-index: 50;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 100%;
          max-height: 100%;
          width: 100%;
          height: 90%; /* Ajusta la altura al 90% del contenedor */
        }

        .close-btn {
          background: red;
          color: white;
          border: none;
          padding: 15px;
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 10px;
          border-radius: 50%;
          font-size: 20px; /* Botón de cierre más grande */
          z-index: 100;
        }

        .locked {
          position: relative;
          filter: blur(5px) opacity(0.6); /* Efecto de disolución y desenfoque */
          pointer-events: none; /* Evita que se puedan clicar los temas bloqueados */
        }

        .locked::before {
          content: '\\1F512'; /* Emoji de candado */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          color: white;
        }

        .unlocked {
          cursor: pointer;
          filter: none;
        }

        .instrucciones {
          font-weight: bold;
          text-align: left;
          width: 100%;
          margin-bottom: 20px;
          padding-left: 10px;
          font-size: 1.5rem; /* Tamaño de letra más grande */
        }
      `}</style>

      {/* Bienvenida de personaje */}
      <section>
        <SeparadorAzul />
        <div className="bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 py-8">
          {/* Volver */}
          <div className="mt-6 ml-10 inline-block">
            <Link href="/niveles/nivel2/mate">
              <img 
                src="/img/home/regresar.png" 
                alt="Volver" 
                className="w-10 h-auto transform hover:scale-110 transition-transform" 
                title="Volver a la página anterior" 
              />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <img 
                src="/img/niveles/mate/starlyvideo2.png" 
                alt="Animated Image" 
                className="h-40 md:h-64 w-auto mb-4 md:mb-0 md:mr-4 animate-tambaleo" 
              />
              <p className="text-black super text-lg md:text-4xl max-w-lg">
              EXPLORA EL MUNDO DEL APRENDIZAJE VISUAL CON NUESTRA COLECCIÓN DE VIDEOS EDUCATIVOS.¡APRENDER NUNCA HA SIDO TAN INTERACTIVO!.
              </p>
            </div>
          </div>
        </div>
        <SeparadorMorado />
      </section>

      {/* Sección de temas */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <p className="instrucciones story">Empieza por el primer video. Cada tema desbloqueado te acercará al siguiente. ¡Disfruta aprendiendo!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {temas.map((tema) => (
              <div 
                key={tema.id}
                className={unlocked.includes(tema.id) ? "unlocked bg-white rounded-lg shadow-lg overflow-hidden" : "locked bg-white rounded-lg shadow-lg overflow-hidden"}
                onClick={() => unlocked.includes(tema.id) && openModal(tema.videoUrl, tema.id)}
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
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>
            <div className="relative" style={{ height: "90%" }}>
              <iframe 
                src={videoUrl}
                title="YouTube Video"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

