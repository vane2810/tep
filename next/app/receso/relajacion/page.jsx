// components/RelaxationSection.js
"use client";

import React, { useState } from 'react';
import Modal from '@/components/modals/receso/relajacion';
import Volver from '@/components/elements/botonVolver';

const RelaxationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalImage, setModalImage] = useState("");

  const openModal = async (topic) => {
    let content;
    let imageSrc = "";

    try {
      if (topic === 'Sonidos de la Naturaleza') {
        content = await import('@/components/receso/sonidos.json');
        imageSrc = "/img/receso/sonidos.png";
      } else if (topic === 'Ejercicio de Respiración') {
        content = await import('@/components/receso/respiracion.json');
        imageSrc = "/img/receso/respiracion.png";
      } else if (topic === 'Meditación Guiada') {
        content = await import('@/components/receso/meditacion.json');
        imageSrc = "/img/receso/meditacion.png";
      }

      setModalContent(content.default);
      setModalImage(imageSrc);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al cargar el contenido:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalImage("");
  };

  return (
    <div className="relative flex flex-col justify-center items-center bg-blue-50 p-4 min-h-screen">
      {/* Botón Volver en la esquina superior izquierda */}
      <div className="top-4 left-4 absolute">
        <Volver href="/receso" />
      </div>

      <h1 className="mb-8 font-bold text-3xl text-blue-700 super">ZONA DE RELAJACIÓN</h1>
      <p className="mb-6 text-center text-gray-600 wonder">Elige una actividad para relajarte y encontrar la calma.</p>

      {/* Imagen Central */}
      <div className="mb-10">
        <img
          src="/img/receso/relajacion2.png"
          alt="Zona de Juegos"
          className="mx-auto w-40 md:w-40 lg:w-70"
        />
      </div>

      {/* Contenedor de tarjetas centradas */}
      <div className="justify-center gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl yagora">
        
        <div className="flex flex-col items-center bg-pink-200 shadow-lg p-4 rounded-xl transform overflow-hidden hover:scale-105 transition-transform">
          <img src="/img/receso/sonidos.png" alt="Sonidos de la Naturaleza" className="mb-4 rounded-full w-20 h-20 object-cover" />
          <h2 className="mb-2 font-semibold text-blue-700 text-center text-lg">Sonidos de la Naturaleza</h2>
          <button
            onClick={() => openModal('Sonidos de la Naturaleza')}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-white"
          >
            Jugar
          </button>
        </div>

        <div className="flex flex-col items-center bg-pink-200 shadow-lg p-4 rounded-xl transform overflow-hidden hover:scale-105 transition-transform">
          <img src="/img/receso/respiracion.png" alt="Ejercicio de Respiración" className="mb-4 rounded-full w-20 h-20 object-cover" />
          <h2 className="mb-2 font-semibold text-blue-700 text-center text-lg">Ejercicio de Respiración</h2>
          <button
            onClick={() => openModal('Ejercicio de Respiración')}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-white"
          >
            Jugar
          </button>
        </div>

        <div className="flex flex-col items-center bg-pink-200 shadow-lg p-4 rounded-xl transform overflow-hidden hover:scale-105 transition-transform">
          <img src="/img/receso/meditacion.png" alt="Meditación Guiada" className="mb-4 rounded-full w-20 h-20 object-cover" />
          <h2 className="mb-2 font-semibold text-blue-700 text-center text-lg">Meditación Guiada</h2>
          <button
            onClick={() => openModal('Meditación Guiada')}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-white"
          >
            Jugar
          </button>
        </div>
      </div>

      {/* Modal dinámico, pasando las propiedades necesarias */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        imageSrc={modalImage}
      />
    </div>
  );
};

export default RelaxationSection;
