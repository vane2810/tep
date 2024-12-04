"use client";
import React from "react";
import HTMLFlipBook from "react-pageflip";
import { FiArrowRightCircle, FiPlayCircle } from "react-icons/fi";
import Link from "next/link";

const EstudiantesNavegacion = ({ openModal }) => {
  const content = {
    title: "Navegación del Estudiante",
    description: "Aprende a navegar por los contenidos de la aplicación.",
    steps: [
      {
        title: "Paso 1",
        description: "Descripción del paso 1.",
        img_url: "/ruta/a/la/imagen1.png",
        audio_url: "/ruta/al/audio1.mp3",
      },
      {
        title: "Paso 2",
        description: "Descripción del paso 2.",
        img_url: "/ruta/a/la/imagen2.png",
        audio_url: "/ruta/al/audio2.mp3",
      },
    ],
  };

  const playLink = "/ruta/al/juego";

  return (
    <div className="relative">
      <div
        onClick={openModal}  // Se usa la función pasada como prop para abrir el modal
        className="w-full sm:w-1/2 lg:w-1/4 p-6 bg-blue-500 border-2 border-black rounded-lg shadow-lg hover:shadow-xl cursor-pointer text-center mb-8"
      >
        <h2 className="font-bold text-xl mb-4">Navegación del Estudiante</h2>
        <img
          src="/img/iconos/navegacion.webp"
          alt="Navegación"
          className="w-32 h-32 mx-auto mb-4"
        />
        <p>Explora cómo navegar por los contenidos.</p>
      </div>
    </div>
  );
};

export default EstudiantesNavegacion;

