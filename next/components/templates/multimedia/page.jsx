//Pagina de Multimedia
"use client";
import React, { useState } from "react";
import { SeparadorAzul, SeparadorMorado } from "@/components/separador";
import Volver from "@/components/elements/botonVolver";
import PropTypes from "prop-types";

const Multimedia = ({ href }) => {
  const [unlocked, setUnlocked] = useState([1]);
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
        <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 py-8">
          <Volver href={href} img="/img/home/regresar/morado.webp"/>
          <div className="flex flex-col justify-center items-center mb-5 text-center">
            <div className="flex md:flex-row flex-col justify-center items-center">
              <img
                src="/img/niveles/mate/starlyvideo1.png"
                alt="Animated Image"
                className="md:mr-4 mb-4 md:mb-0 w-auto h-40 md:h-64 animate-tambaleo"
              />
              <p className="max-w-lg text-black text-lg md:text-4xl super">
                BIENVENIDA/O A NUESTRA GALERIA MULTIMEDIA, DONDE CADA VIDEO ES UNA PUERTA HACIA EL CONOCIMIENTO ¡HAZ CLIC Y DEJA QUE LA EDUCACIÓN TE SORPRENDA!
              </p>
            </div>
          </div>
        </div>
        <SeparadorMorado />
      </section>

      {/* Sección de temas */}
      <section className="bg-gray-100 py-8">
        <div className="mx-auto px-4 container">
          <p className="instrucciones yagora">Cada tema desbloqueado te acercará al siguiente. ¡Disfruta aprendiendo!</p>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {temas.map((tema) => (
              <div
                key={tema.id}
                className={unlocked.includes(tema.id) ? "unlocked bg-white rounded-lg shadow-lg overflow-hidden" : "locked bg-white rounded-lg shadow-lg overflow-hidden"}
                onClick={() => unlocked.includes(tema.id) && openModal(tema.videoUrl, tema.id)}
              >
                <img
                  src={tema.img}
                  alt={tema.title}
                  className="w-full h-28 sm:h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{tema.title}</h3>
                  <p className="mt-2 text-gray-600">{tema.description}</p>
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
                className="top-0 left-0 absolute w-full h-full"
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

Multimedia.propTypes = {
  href: PropTypes.string.isRequired,
};
export default Multimedia;
